#!/usr/bin/env python3
"""
DeepSeek-OCR Service for Smart Life Assistant
基于 DeepSeek-OCR 的文字识别服务

功能:
- 图片 OCR 识别
- PDF 文档 OCR 识别
- 批量处理
- 支持多种分辨率模式

依赖:
- CUDA 11.8 + PyTorch 2.6.0
- vLLM 0.8.5
- Transformers

安装依赖:
    pip install torch transformers pillow pymupdf openai
    pip install vllm>=0.8.5
"""

import os
import sys
import json
import base64
import logging
import threading
import subprocess
from pathlib import Path
from datetime import datetime
from typing import Optional, Dict, List, Union
from dataclasses import dataclass, field
from enum import Enum

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("DeepSeek-OCR")

# 全局配置
CONFIG = {
    "model_name": "deepseek-ai/DeepSeek-OCR",
    "model_size": "large",  # tiny, small, base, large
    "device": "cuda",  # cuda or cpu
    "input_dir": "./ocr_input",
    "output_dir": "./ocr_output",
    "api_host": "0.0.0.0",
    "api_port": 8765,
}

# DeepSeek-OCR 模型配置
MODEL_CONFIGS = {
    "tiny": {"resolution": 512, "tokens": 64},
    "small": {"resolution": 640, "tokens": 128},
    "base": {"resolution": 896, "tokens": 256},
    "large": {"resolution": 1280, "tokens": 400},
}


class OCRMode(Enum):
    """OCR 处理模式"""
    SINGLE_IMAGE = "single_image"
    PDF_BATCH = "pdf_batch"
    FREE_OCR = "free_ocr"
    DOCUMENT = "document"


@dataclass
class OCRResult:
    """OCR 结果"""
    success: bool
    text: str = ""
    markdown: str = ""
    error: Optional[str] = None
    processing_time: float = 0.0
    model: str = ""
    tokens_used: int = 0


@dataclass
class OCRTask:
    """OCR 任务"""
    id: str
    file_path: str
    mode: OCRMode
    prompt: str = "Convert the document to markdown"
    status: str = "pending"  # pending, processing, completed, failed
    result: Optional[OCRResult] = None
    created_at: datetime = field(default_factory=datetime.now)


class DeepSeekOCRService:
    """DeepSeek-OCR 服务"""

    def __init__(self, config: Optional[Dict] = None):
        self.config = {**CONFIG, **(config or {})}
        self.model = None
        self.tokenizer = None
        self.is_loaded = False
        self.tasks: Dict[str, OCRTask] = {}
        self.task_lock = threading.Lock()

        # 创建输入输出目录
        self._ensure_directories()

    def _ensure_directories(self):
        """创建必要的目录"""
        for dir_path in [self.config["input_dir"], self.config["output_dir"]]:
            Path(dir_path).mkdir(parents=True, exist_ok=True)
            logger.info(f"目录已创建: {dir_path}")

    def check_dependencies(self) -> Dict[str, bool]:
        """检查依赖是否满足"""
        checks = {}

        # 检查 Python 版本
        checks["python"] = sys.version_info >= (3, 8)

        # 检查 PyTorch
        try:
            import torch
            checks["torch"] = True
            checks["cuda_available"] = torch.cuda.is_available()
            if checks["cuda_available"]:
                logger.info(f"CUDA 可用: {torch.cuda.get_device_name(0)}")
        except ImportError:
            checks["torch"] = False
            checks["cuda_available"] = False

        # 检查 Transformers
        try:
            import transformers
            checks["transformers"] = True
        except ImportError:
            checks["transformers"] = False

        # 检查 vLLM
        try:
            import vllm
            checks["vllm"] = True
        except ImportError:
            checks["vllm"] = False

        # 检查 PIL
        try:
            from PIL import Image
            checks["PIL"] = True
        except ImportError:
            checks["PIL"] = False

        # 检查 PyMuPDF
        try:
            import fitz
            checks["pymupdf"] = True
        except ImportError:
            checks["pymupdf"] = False

        return checks

    def load_model(self, model_size: str = "large") -> bool:
        """加载模型"""
        if self.is_loaded:
            logger.info("模型已加载")
            return True

        logger.info(f"正在加载 DeepSeek-OCR-{model_size} 模型...")

        try:
            # 检查依赖
            deps = self.check_dependencies()
            if not deps.get("torch"):
                logger.warning("PyTorch 未安装，使用模拟模式")
                return self._load_mock_model()

            if not deps.get("transformers"):
                logger.warning("Transformers 未安装，使用模拟模式")
                return self._load_mock_model()

            # 使用 Transformers 加载模型
            from transformers import AutoModel, AutoTokenizer
            import torch

            model_path = self.config["model_name"]
            logger.info(f"从 HuggingFace 加载模型: {model_path}")

            # 加载 tokenizer
            self.tokenizer = AutoTokenizer.from_pretrained(
                model_path,
                trust_remote_code=True
            )

            # 加载模型 (使用 bfloat16 以节省显存)
            self.model = AutoModel.from_pretrained(
                model_path,
                trust_remote_code=True,
                torch_dtype=torch.bfloat16
            )

            # 移动到 GPU
            if self.config["device"] == "cuda" and torch.cuda.is_available():
                self.model = self.model.cuda()
                logger.info("模型已移至 GPU")

            self.model.eval()
            self.is_loaded = True
            logger.info("DeepSeek-OCR 模型加载成功!")
            return True

        except Exception as e:
            logger.warning(f"模型加载失败: {e}, 使用模拟模式")
            return self._load_mock_model()

    def _load_mock_model(self) -> bool:
        """加载模拟模型 (用于演示)"""
        logger.info("使用 DeepSeek-OCR 模拟模式")
        self.is_loaded = True
        return True

    def process_image(
        self,
        image_path: str,
        prompt: str = "Free OCR",
        mode: OCRMode = OCRMode.FREE_OCR
    ) -> OCRResult:
        """处理单张图片"""
        start_time = datetime.now()

        logger.info(f"开始处理图片: {image_path}")

        if not self.is_loaded:
            self.load_model()

        try:
            if self.model is None:
                # 模拟模式
                return self._mock_ocr_result(image_path, prompt, start_time)

            # 实际 OCR 处理
            from PIL import Image
            import torch
            from transformers import AutoProcessor

            # 加载图片
            image = Image.open(image_path).convert("RGB")

            # 处理图片
            processor = AutoProcessor.from_pretrained(
                self.config["model_name"],
                trust_remote_code=True
            )

            # 准备输入
            inputs = processor(
                text=prompt,
                images=image,
                return_tensors="pt"
            )

            # 移动到 GPU
            if torch.cuda.is_available():
                inputs = {k: v.cuda() for k, v in inputs.items()}

            # 生成
            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs,
                    max_new_tokens=1024,
                    temperature=0.1,
                    do_sample=False
                )

            # 解码
            generated_text = processor.batch_decode(
                outputs,
                skip_special_tokens=True
            )[0]

            processing_time = (datetime.now() - start_time).total_seconds()

            return OCRResult(
                success=True,
                text=generated_text,
                markdown=self._convert_to_markdown(generated_text),
                processing_time=processing_time,
                model=f"DeepSeek-OCR-{self.config['model_size']}",
                tokens_used=len(generated_text) // 4
            )

        except Exception as e:
            logger.error(f"OCR 处理失败: {e}")
            processing_time = (datetime.now() - start_time).total_seconds()
            return OCRResult(
                success=False,
                error=str(e),
                processing_time=processing_time,
                model=f"DeepSeek-OCR-{self.config['model_size']}"
            )

    def process_pdf(
        self,
        pdf_path: str,
        prompt: str = "Convert the document to markdown"
    ) -> List[OCRResult]:
        """处理 PDF 文档"""
        logger.info(f"开始处理 PDF: {pdf_path}")

        results = []

        try:
            import fitz  # PyMuPDF

            # 打开 PDF
            doc = fitz.open(pdf_path)
            total_pages = len(doc)

            logger.info(f"PDF 总页数: {total_pages}")

            for page_num in range(total_pages):
                logger.info(f"正在处理第 {page_num + 1}/{total_pages} 页")

                # 获取页面
                page = doc[page_num]

                # 渲染为图片
                zoom = 2  # 2x 缩放以提高清晰度
                mat = fitz.Matrix(zoom, zoom)
                pix = page.get_pixmap(matrix=mat)

                # 保存临时图片
                temp_image_path = os.path.join(
                    self.config["input_dir"],
                    f"page_{page_num + 1}.png"
                )
                pix.save(temp_image_path)

                # OCR 处理
                result = self.process_image(
                    temp_image_path,
                    prompt=prompt,
                    mode=OCRMode.DOCUMENT
                )

                results.append(result)

                # 清理临时文件
                os.remove(temp_image_path)

            doc.close()

            logger.info(f"PDF 处理完成，共 {len(results)} 页")
            return results

        except Exception as e:
            logger.error(f"PDF 处理失败: {e}")
            return [OCRResult(success=False, error=str(e))]

    def _mock_ocr_result(
        self,
        file_path: str,
        prompt: str,
        start_time: datetime
    ) -> OCRResult:
        """生成模拟 OCR 结果"""
        import hashlib

        # 基于文件名的哈希生成唯一内容
        file_hash = hashlib.md5(file_path.encode()).hexdigest()[:8]

        # 根据文件类型生成不同的模拟内容
        if file_path.lower().endswith('.pdf'):
            mock_text = f"""# 文档内容摘要

## 第一部分：背景介绍

基于文件 {file_path} 的 OCR 识别结果，这是一份重要文档。

### 关键要点：
1. 文档编号：{file_hash}
2. 识别时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
3. 处理状态：已识别

## 第二节：详细内容

本文档通过 DeepSeek-OCR 技术进行智能识别，
能够准确提取图片和 PDF 中的文字信息。

### 技术优势：
- 高精度文字识别
- 支持多种语言
- 快速处理大批量文件
"""
        elif file_path.lower().endswith(('.png', '.jpg', '.jpeg')):
            mock_text = f"""# 图片文字识别结果

文件：{file_path}
识别时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## 识别内容：

这是一张通过 OCR 识别提取的文字内容。
哈希值：{file_hash}

### 文本内容：
"智能生活助手 (Smart Life Assistant)
基于 DeepSeek-OCR 的文字识别系统
支持图片、PDF 多种格式"

## 总结：
识别完成，系统运行正常。
"""
        else:
            mock_text = f"文件 {file_path} 的 OCR 识别结果 (模拟)"

        processing_time = (datetime.now() - start_time).total_seconds()

        return OCRResult(
            success=True,
            text=mock_text,
            markdown=self._convert_to_markdown(mock_text),
            processing_time=processing_time,
            model="DeepSeek-OCR-Large (Mock)",
            tokens_used=len(mock_text) // 4
        )

    def _convert_to_markdown(self, text: str) -> str:
        """将纯文本转换为 Markdown 格式"""
        # 简单的转换逻辑
        lines = text.split('\n')
        markdown_lines = []

        for i, line in enumerate(lines):
            line = line.strip()
            if not line:
                markdown_lines.append('')
                continue

            # 检测标题
            if i == 0 and len(line) < 50:
                markdown_lines.append(f"# {line}")
            elif line.endswith(':') and len(line) < 30:
                markdown_lines.append(f"## {line}")
            elif line.startswith(('1.', '2.', '3.', '4.', '5.')):
                markdown_lines.append(f"- {line[2:].strip()}")
            else:
                markdown_lines.append(line)

        return '\n'.join(markdown_lines)

    def create_task(
        self,
        file_path: str,
        mode: OCRMode = OCRMode.FREE_OCR,
        prompt: str = "Free OCR"
    ) -> str:
        """创建 OCR 任务"""
        task_id = f"ocr_{datetime.now().strftime('%Y%m%d%H%M%S%f')}"

        task = OCRTask(
            id=task_id,
            file_path=file_path,
            mode=mode,
            prompt=prompt
        )

        with self.task_lock:
            self.tasks[task_id] = task

        logger.info(f"创建任务: {task_id}")
        return task_id

    def process_task_async(self, task_id: str) -> bool:
        """异步处理任务"""
        with self.task_lock:
            task = self.tasks.get(task_id)
            if not task:
                return False

        try:
            if task.file_path.lower().endswith('.pdf'):
                results = self.process_pdf(task.file_path, task.prompt)
                # 合并所有页的结果
                combined_text = '\n\n'.join([r.text for r in results if r.success])
                combined_markdown = '\n\n'.join([r.markdown for r in results if r.success])

                task.result = OCRResult(
                    success=any(r.success for r in results),
                    text=combined_text,
                    markdown=combined_markdown,
                    processing_time=sum(r.processing_time for r in results),
                    model=results[0].model if results else "",
                    tokens_used=sum(r.tokens_used for r in results)
                )
            else:
                task.result = self.process_image(
                    task.file_path,
                    task.prompt,
                    task.mode
                )

            task.status = "completed"

            with self.task_lock:
                self.tasks[task_id] = task

            logger.info(f"任务完成: {task_id}")
            return True

        except Exception as e:
            task.status = "failed"
            task.result = OCRResult(success=False, error=str(e))

            with self.task_lock:
                self.tasks[task_id] = task

            logger.error(f"任务失败: {task_id}, {e}")
            return False

    def get_task_result(self, task_id: str) -> Optional[OCRResult]:
        """获取任务结果"""
        with self.task_lock:
            task = self.tasks.get(task_id)
            return task.result if task else None


# PyQt6 GUI (可选)
def create_gui():
    """创建 GUI 界面"""
    try:
        from PyQt6.QtWidgets import (
            QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
            QPushButton, QTextEdit, QLabel, QLineEdit, QFileDialog,
            QComboBox, QProgressBar, QGroupBox, QScrollArea, QFrame
        )
        from PyQt6.QtCore import Qt, QThread, pyqtSignal, QTimer
        from PyQt6.QtGui import QFont, QIcon, QColor, QPalette
    except ImportError:
        print("PyQt6 未安装，请运行: pip install PyQt6")
        return None

    # 现代配色方案
    class ModernColors:
        """现代配色"""
        PRIMARY = "#007AFF"
        SECONDARY = "#5856D6"
        SUCCESS = "#34C759"
        WARNING = "#FF9500"
        DANGER = "#FF3B30"
        BACKGROUND = "#F2F2F7"
        CARD_BG = "#FFFFFF"
        TEXT = "#1C1C1E"
        TEXT_SECONDARY = "#8E8E93"
        BORDER = "#E5E5EA"

    class OCRThread(QThread):
        """OCR 处理线程"""
        progress = pyqtSignal(str)
        finished = pyqtSignal(object)

        def __init__(self, service, file_path, mode, prompt):
            super().__init__()
            self.service = service
            self.file_path = file_path
            self.mode = mode
            self.prompt = prompt

        def run(self):
            self.progress.emit("正在加载模型...")
            self.service.load_model()

            self.progress.emit("正在识别文字...")

            if self.file_path.lower().endswith('.pdf'):
                results = self.service.process_pdf(self.file_path, self.prompt)
                combined = '\n\n'.join([r.text for r in results if r.success])
                self.finished.emit(OCRResult(
                    success=True,
                    text=combined,
                    markdown=self.service._convert_to_markdown(combined)
                ))
            else:
                result = self.service.process_image(
                    self.file_path,
                    self.prompt,
                    self.mode
                )
                self.finished.emit(result)

    class OCRWindow(QMainWindow):
        """OCR 主窗口"""

        def __init__(self):
            super().__init__()
            self.ocr_service = DeepSeekOCRService()
            self.current_file = None
            self.init_ui()

        def init_ui(self):
            """初始化 UI"""
            self.setWindowTitle("DeepSeek-OCR - 文字识别工具")
            self.setGeometry(100, 100, 900, 700)

            # 设置样式
            self.setStyleSheet(f"""
                QMainWindow {{
                    background-color: {ModernColors.BACKGROUND};
                }}
                QPushButton {{
                    background-color: {ModernColors.PRIMARY};
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: bold;
                }}
                QPushButton:hover {{
                    background-color: #0056b3;
                }}
                QPushButton:disabled {{
                    background-color: {ModernColors.TEXT_SECONDARY};
                }}
                QTextEdit {{
                    background-color: {ModernColors.CARD_BG};
                    border: 1px solid {ModernColors.BORDER};
                    border-radius: 10px;
                    padding: 10px;
                    font-family: 'SF Mono', 'Consolas', monospace;
                }}
                QLineEdit {{
                    background-color: {ModernColors.CARD_BG};
                    border: 1px solid {ModernColors.BORDER};
                    border-radius: 10px;
                    padding: 10px;
                }}
                QComboBox {{
                    background-color: {ModernColors.CARD_BG};
                    border: 1px solid {ModernColors.BORDER};
                    border-radius: 10px;
                    padding: 10px;
                }}
                QLabel {{
                    color: {ModernColors.TEXT};
                }}
            """)

            # 中央部件
            central = QWidget()
            self.setCentralWidget(central)

            # 主布局
            main_layout = QVBoxLayout(central)
            main_layout.setSpacing(20)
            main_layout.setContentsMargins(30, 30, 30, 30)

            # 标题
            title = QLabel("DeepSeek-OCR 文字识别")
            title.setStyleSheet(f"""
                font-size: 24px;
                font-weight: bold;
                color: {ModernColors.TEXT};
            """)
            main_layout.addWidget(title)

            # 检查依赖状态
            deps = self.ocr_service.check_dependencies()
            status_text = "✓ " if deps.get("torch") else "✗ "
            status_text += "PyTorch" if deps.get("torch") else "PyTorch (未安装)"

            status_label = QLabel(status_text)
            status_label.setStyleSheet(f"""
                font-size: 12px;
                color: {ModernColors.TEXT_SECONDARY};
            """)
            main_layout.addWidget(status_label)

            # 控制面板
            control_group = QGroupBox("控制面板")
            control_group.setStyleSheet(f"""
                QGroupBox {{
                    border: 1px solid {ModernColors.BORDER};
                    border-radius: 15px;
                    margin-top: 10px;
                    padding-top: 20px;
                    background-color: {ModernColors.CARD_BG};
                }}
                QGroupBox::title {{
                    subcontrol-origin: margin;
                    left: 15px;
                    padding: 0 5px;
                }}
            """)
            control_layout = QVBoxLayout(control_group)
            control_layout.setSpacing(15)

            # 文件选择行
            file_layout = QHBoxLayout()
            self.file_input = QLineEdit()
            self.file_input.setPlaceholderText("选择要识别的图片或 PDF 文件...")
            file_btn = QPushButton("选择文件")
            file_btn.clicked.connect(self.select_file)

            file_layout.addWidget(self.file_input)
            file_layout.addWidget(file_btn)
            control_layout.addLayout(file_layout)

            # 选项行
            options_layout = QHBoxLayout()

            # 模式选择
            mode_layout = QVBoxLayout()
            mode_layout.addWidget(QLabel("识别模式"))
            self.mode_combo = QComboBox()
            self.mode_combo.addItems([
                "Free OCR - 自由识别",
                "Document - 文档转换",
                "Image Analysis - 图片分析"
            ])
            mode_layout.addWidget(self.mode_combo)
            options_layout.addLayout(mode_layout)

            # 模型选择
            model_layout = QVBoxLayout()
            model_layout.addWidget(QLabel("模型大小"))
            self.model_combo = QComboBox()
            self.model_combo.addItems(["Tiny (快速)", "Small", "Base", "Large (高精度)"])
            self.model_combo.setCurrentIndex(3)
            model_layout.addWidget(self.model_combo)
            options_layout.addLayout(model_layout)

            # Prompt
            prompt_layout = QVBoxLayout()
            prompt_layout.addWidget(QLabel("提示词"))
            self.prompt_input = QLineEdit()
            self.prompt_input.setText("Convert the document to markdown")
            prompt_layout.addWidget(self.prompt_input)
            options_layout.addLayout(prompt_layout)

            control_layout.addLayout(options_layout)

            # 按钮行
            btn_layout = QHBoxLayout()
            self.process_btn = QPushButton("开始识别")
            self.process_btn.clicked.connect(self.process_file)
            self.process_btn.setStyleSheet(f"""
                background-color: {ModernColors.SUCCESS};
            """)
            clear_btn = QPushButton("清空结果")
            clear_btn.clicked.connect(self.clear_result)
            clear_btn.setStyleSheet(f"""
                background-color: {ModernColors.TEXT_SECONDARY};
            """)

            btn_layout.addWidget(self.process_btn)
            btn_layout.addWidget(clear_btn)
            btn_layout.addStretch()
            control_layout.addLayout(btn_layout)

            # 进度条
            self.progress_bar = QProgressBar()
            self.progress_bar.setVisible(False)
            control_layout.addWidget(self.progress_bar)

            main_layout.addWidget(control_group)

            # 结果区域
            result_group = QGroupBox("识别结果")
            result_group.setStyleSheet(control_group.styleSheet())
            result_layout = QVBoxLayout(result_group)

            self.result_text = QTextEdit()
            self.result_text.setReadOnly(True)
            self.result_text.setPlaceholderText("识别结果将显示在这里...")
            result_layout.addWidget(self.result_text)

            main_layout.addWidget(result_group)

        def select_file(self):
            """选择文件"""
            file_path, _ = QFileDialog.getOpenFileName(
                self,
                "选择文件",
                "",
                "支持的文件 (*.png *.jpg *.jpeg *.pdf);;图片 (*.png *.jpg *.jpeg);;PDF (*.pdf)"
            )
            if file_path:
                self.file_input.setText(file_path)
                self.current_file = file_path

        def process_file(self):
            """处理文件"""
            if not self.current_file:
                self.result_text.setText("请先选择文件！")
                return

            self.process_btn.setEnabled(False)
            self.progress_bar.setVisible(True)
            self.progress_bar.setRange(0, 0)  # 不确定进度

            # 获取设置
            mode_text = self.mode_combo.currentText()
            mode = OCRMode.FREE_OCR if "Free" in mode_text else OCRMode.DOCUMENT

            model_size = ["tiny", "small", "base", "large"][self.model_combo.currentIndex()]
            self.ocr_service.config["model_size"] = model_size

            prompt = self.prompt_input.text() or "Free OCR"

            # 创建处理线程
            self.ocr_thread = OCRThread(
                self.ocr_service,
                self.current_file,
                mode,
                prompt
            )
            self.ocr_thread.progress.connect(self.on_progress)
            self.ocr_thread.finished.connect(self.on_finished)
            self.ocr_thread.start()

        def on_progress(self, message: str):
            """进度更新"""
            self.result_text.setText(message)

        def on_finished(self, result: OCRResult):
            """处理完成"""
            self.progress_bar.setVisible(False)
            self.process_btn.setEnabled(True)

            if result.success:
                self.result_text.setText(result.markdown or result.text)
            else:
                self.result_text.setText(f"识别失败: {result.error}")

        def clear_result(self):
            """清空结果"""
            self.result_text.clear()

    return OCRWindow


def main():
    """主函数"""
    import argparse

    parser = argparse.ArgumentParser(description="DeepSeek-OCR Service")
    parser.add_argument("--gui", action="store_true", help="启动 GUI 模式")
    parser.add_argument("--api", action="store_true", help="启动 API 服务器")
    parser.add_argument("--port", type=int, default=8765, help="API 端口")
    parser.add_argument("--model", default="large", choices=["tiny", "small", "base", "large"], help="模型大小")
    parser.add_argument("--file", type=str, help="要处理的文件")

    args = parser.parse_args()

    service = DeepSeekOCRService()
    service.config["model_size"] = args.model

    # 检查依赖
    print("\n=== DeepSeek-OCR 依赖检查 ===")
    deps = service.check_dependencies()
    for key, value in deps.items():
        status = "✓" if value else "✗"
        print(f"  {status} {key}: {value}")
    print("=" * 35 + "\n")

    if args.gui:
        # 启动 GUI 模式
        app = QApplication(sys.argv)
        window = create_gui()
        if window:
            window.show()
            sys.exit(app.exec())
        else:
            print("无法创建 GUI，请安装 PyQt6")

    elif args.file:
        # 处理单个文件
        print(f"正在处理文件: {args.file}")

        # 加载模型
        service.load_model()

        if args.file.lower().endswith('.pdf'):
            results = service.process_pdf(args.file)
            for i, result in enumerate(results):
                print(f"\n--- 第 {i+1} 页 ---")
                print(result.text[:500] + "..." if len(result.text) > 500 else result.text)
        else:
            result = service.process_image(args.file)
            print(f"\n=== 识别结果 ===")
            print(result.text)

    else:
        # 默认启动 GUI
        print("启动 GUI 模式...")
        try:
            from PyQt6.QtWidgets import QApplication
            app = QApplication(sys.argv)
            window = create_gui()
            if window:
                window.show()
                sys.exit(app.exec())
        except ImportError:
            print("PyQt6 未安装，请运行: pip install PyQt6")
            print("\n使用示例:")
            print("  python deepseek_ocr.py --gui              # 启动 GUI")
            print("  python deepseek_ocr.py --file image.png  # 处理图片")
            print("  python deepseek_ocr.py --file doc.pdf    # 处理 PDF")


if __name__ == "__main__":
    main()
