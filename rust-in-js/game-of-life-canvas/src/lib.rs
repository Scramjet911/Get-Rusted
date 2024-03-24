use core::fmt;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl Universe {
    fn get_cell(&self, row: u32, column: u32) -> u8 {
        self.cells[(row * self.width + column) as usize] as u8
    }
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }
    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        for &delta_row in [self.height - 1, 0, 1].iter() {
            for &delta_col in [self.width - 1, 0, 1].iter() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                let cell_value = self.get_cell(neighbor_row, neighbor_col);
                count += cell_value;
            }
        }
        count
    }
    pub fn step(&mut self) {
        let mut next_cells = self.cells.clone();
        for row in 0..self.width {
            for col in 0..self.height {
                let idx = self.get_index(row, col);
                let curr_cell = self.cells[idx];
                let live_neigh = self.live_neighbor_count(row, col);

                let next_cell = match (curr_cell, live_neigh) {
                    (Cell::Alive, x) if x < 2 => Cell::Dead,
                    (Cell::Alive, x) if [2, 3].contains(&x) => Cell::Alive,
                    (Cell::Alive, x) if x > 3 => Cell::Dead,
                    (Cell::Dead, 3) => Cell::Alive,
                    (otherwise, _) => otherwise,
                };

                next_cells[idx] = next_cell
            }
        }
        self.cells = next_cells;
    }

    pub fn new() -> Universe {
        let width = 64;
        let height = 64;

        let cells = (0..width * height)
            .map(|i| {
                if i % 3 == 0 || i % 11 == 0 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();

        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn render(&self) -> String {
        self.to_string()
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }
}

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        for (idx, &cell) in self.cells.iter().enumerate() {
            let sym = if cell == Cell::Dead { '◻' } else { '◼' };
            if idx % (self.width as usize) == 0 {
                write!(f, "\n")?;
            }
            write!(f, "{}", sym)?;
        }
        Ok(())
    }
}
