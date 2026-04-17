#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
将markdown文件转换为docx格式
"""

import os
import glob
import pypandoc


def convert_md_to_docx(md_file):
    """将markdown文件转换为docx格式"""
    try:
        # 生成输出文件名
        docx_file = os.path.splitext(md_file)[0] + ".docx"
        
        # 使用pypandoc转换
        output = pypandoc.convert_file(
            md_file,
            'docx',
            outputfile=docx_file
        )
        
        return docx_file
    except Exception as e:
        print(f"转换失败 {os.path.basename(md_file)}: {str(e)}")
        return None


def main():
    """主函数"""
    # 指定shiyan目录
    shiyan_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "shiyan")
    
    if not os.path.exists(shiyan_dir):
        print(f"目录不存在: {shiyan_dir}")
        return
    
    # 查找所有md文件
    md_files = glob.glob(os.path.join(shiyan_dir, "*.md"))
    
    if not md_files:
        print("未找到md文件")
        return
    
    print(f"找到 {len(md_files)} 个md文件")
    
    # 确保pandoc可用
    try:
        pandoc_path = pypandoc.get_pandoc_path()
        print(f"使用pandoc: {pandoc_path}")
    except OSError:
        print("正在下载pandoc...")
        pypandoc.download_pandoc()
        print("pandoc下载完成")
    
    for md_file in md_files:
        print(f"\n正在转换: {os.path.basename(md_file)}")
        docx_file = convert_md_to_docx(md_file)
        
        if docx_file:
            print(f"转换完成: {os.path.basename(docx_file)}")
    
    print("\n所有文件转换完成！")


if __name__ == "__main__":
    main()