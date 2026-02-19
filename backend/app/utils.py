"""Utility helpers for rag-chatbot backend."""
import os


def list_data_files(data_dir: str):
    data_dir = os.path.abspath(data_dir)
    if not os.path.exists(data_dir):
        return []
    return [os.path.join(data_dir, f) for f in os.listdir(data_dir)]
