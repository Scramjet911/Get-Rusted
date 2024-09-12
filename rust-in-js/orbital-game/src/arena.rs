use macroquad::{
    miniquad::date,
    rand::{rand, srand},
};

use crate::bound::Bound;
pub struct Arena {
    pub origin_x: f32,
    pub origin_y: f32,
    pub radius: f32,
    pub bounds: (Bound, Bound),
    pub bound_gap_angle: f32,
}

impl Arena {
    pub fn new(x: f32, y: f32, radius: f32, bound_gap: f32, bound_radius: f32) -> Arena {
        let start_bound = Bound::with_encoding((rand() as f32) % 360.0, x, y, radius, bound_radius);
        let end_bound = Bound::with_encoding(
            (start_bound.angle + bound_gap) % 360.0,
            x,
            y,
            radius,
            bound_radius,
        );

        Arena {
            origin_x: x,
            origin_y: y,
            radius: radius,
            bounds: (start_bound, end_bound),
            bound_gap_angle: bound_gap,
        }
    }

    pub fn next_bounds(&mut self) {
        srand(date::now() as _);
        self.bound_gap_angle = (self.bound_gap_angle - 2.0).max(10.0); // Decrease gap, but keep a minimum of 10 degrees
        let start_angle = (rand() as f32) % 360.0;
        let end_angle = (start_angle + self.bound_gap_angle) % 360.0;

        self.bounds.0 = Bound::with_encoding(
            start_angle,
            self.origin_x,
            self.origin_y,
            self.radius,
            self.bounds.0.radius,
        );
        self.bounds.1 = Bound::with_encoding(
            end_angle,
            self.origin_x,
            self.origin_y,
            self.radius,
            self.bounds.0.radius,
        );
    }
}
