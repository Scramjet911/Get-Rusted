use macroquad::color::Color;

use crate::arena::Arena;
pub struct Player {
    pub posx: f32,
    pub posy: f32,
    pub radius: f32,
    pub color: Color,
    pub angle: f32,
    pub speed: f32,
    pub points: i32,
}

impl Player {
    pub fn new(posx: f32, posy: f32, radius: f32, color: Color, angle: f32, speed: f32) -> Self {
        Player {
            posx,
            posy,
            radius,
            color,
            angle,
            speed,
            points: 0,
        }
    }

    pub fn step(&mut self, arena: &Arena) {
        self.angle = (self.angle + self.speed) % 360.0;
        self.posx = arena.origin_x + f32::cos(self.angle.to_radians()) * arena.radius;
        self.posy = arena.origin_y + f32::sin(self.angle.to_radians()) * arena.radius;
    }
    pub fn action_possible(&self, arena: &Arena) -> bool {
        let start_angle = arena.bounds.0.angle;
        let end_angle = arena.bounds.1.angle;
        let player_angle = self.angle % 360.0;

        if start_angle <= end_angle {
            // The gap doesn't cross the 0/360 boundary
            player_angle >= start_angle && player_angle <= end_angle
        } else {
            // The gap crosses the 0/360 boundary
            player_angle >= start_angle || player_angle <= end_angle
        }
    }
}
