pub struct Bound {
    pub angle: f32,
    pub x: f32,
    pub y: f32,
    pub radius: f32,
}

impl Bound {
    pub fn with_encoding(
        angle: f32,
        origin_x: f32,
        origin_y: f32,
        arena_radius: f32,
        bound_radius: f32,
    ) -> Bound {
        Bound {
            angle: angle,
            x: origin_x + f32::cos(angle.to_radians()) * arena_radius,
            y: origin_y + f32::sin(angle.to_radians()) * arena_radius,
            radius: bound_radius,
        }
    }
}
