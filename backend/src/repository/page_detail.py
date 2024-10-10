from dataclasses import dataclass
from typing import Optional


@dataclass
class Page:
    total: Optional[int] = None
    pages: Optional[list] = None

    def __init__(self):
        pass
