#!/usr/bin/env python3
"""Recorta imagens de QR code PIX deixando apenas o quadrado do QR.

Remove qualquer texto abaixo/acima do QR (valor, nome, CPF do beneficiario),
mantendo uma pequena borda de silencio (quiet zone) para o codigo continuar
escaneavel. Sobrescreve a imagem no lugar.

Uso:
    python3 scripts/crop_qr.py imgs/qr_code/cafe_manha.jpeg [outros...]
    python3 scripts/crop_qr.py            # processa todos em imgs/qr_code/
"""
import sys
import glob
import numpy as np
from PIL import Image

DARK_THRESHOLD = 110     # pixel < isto = modulo escuro do QR
MARGIN_FRAC = 0.06       # borda de silencio, fracao do lado do QR


def detect_qr_box(gray):
    arr = np.asarray(gray)
    dark = arr < DARK_THRESHOLD
    h, w = dark.shape

    row_dark = dark.sum(axis=1)
    min_row = max(5, int(0.02 * w))     # linha "com conteudo"
    content = row_dark > min_row

    # agrupa linhas de conteudo em bandas, tolerando pequenos vaos
    gap_tol = max(4, int(0.012 * h))
    bands = []
    start = None
    gap = 0
    for y in range(h):
        if content[y]:
            if start is None:
                start = y
            gap = 0
        else:
            if start is not None:
                gap += 1
                if gap > gap_tol:
                    bands.append((start, y - gap))
                    start = None
                    gap = 0
    if start is not None:
        bands.append((start, h - 1))

    if not bands:
        raise RuntimeError("nenhum bloco escuro encontrado")

    # o QR e o bloco mais alto (texto e bem mais baixo)
    y0, y1 = max(bands, key=lambda b: b[1] - b[0])

    # extensao horizontal dentro da banda do QR
    col_dark = dark[y0:y1 + 1, :].sum(axis=0)
    min_col = max(5, int(0.02 * (y1 - y0)))
    cols = np.where(col_dark > min_col)[0]
    x0, x1 = int(cols.min()), int(cols.max())

    return x0, y0, x1, y1


def crop(path):
    img = Image.open(path)
    gray = img.convert("L")
    x0, y0, x1, y1 = detect_qr_box(gray)

    side = max(x1 - x0, y1 - y0)
    margin = int(side * MARGIN_FRAC)
    w, h = img.size
    left = max(0, x0 - margin)
    top = max(0, y0 - margin)
    right = min(w, x1 + margin)
    bottom = min(h, y1 + margin)

    out = img.crop((left, top, right, bottom))
    out.save(path, quality=95)
    print(f"{path}: {w}x{h} -> {out.size[0]}x{out.size[1]} (box {x0},{y0},{x1},{y1})")


def main():
    targets = sys.argv[1:]
    if not targets:
        targets = sorted(
            f for ext in ("jpg", "jpeg", "png")
            for f in glob.glob(f"imgs/qr_code/*.{ext}")
        )
    if not targets:
        print("nenhum arquivo para processar")
        return
    for path in targets:
        crop(path)


if __name__ == "__main__":
    main()
