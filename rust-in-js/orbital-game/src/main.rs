use macroquad::prelude::*;

mod arena;
mod bound;
mod player;

use crate::arena::Arena;
use crate::player::*;

#[no_mangle]
#[macroquad::main("OrbitalStrike")]
pub async fn main() {
    let (mut player, mut arena, mut current_time) = initialize_game();
    let mut game_over = false;

    loop {
        clear_background(WHITE);

        if !game_over {
            draw_game_elements(&player, &arena);
            display_points(&player);
            game_over = handle_player_input(&mut player, &mut arena);
            update_player_position(&mut player, &arena, &mut current_time);
        } else {
            display_game_over(&player);
            if handle_restart_input() {
                (player, arena, current_time) = initialize_game();
                game_over = false;
            }
        }

        next_frame().await
    }
}

fn initialize_game() -> (Player, Arena, f64) {
    let origin_x = screen_width() / 2.0;
    let origin_y = screen_height() / 2.0;
    let perimeter_radius = 100.0;

    let player = Player::new(origin_x + perimeter_radius, origin_y, 10.0, BLUE, 0.0, 2.0);
    let arena = Arena::new(origin_x, origin_y, perimeter_radius, 100.0, 10.0);
    let current_time = get_time();

    (player, arena, current_time)
}

fn draw_game_elements(player: &Player, arena: &Arena) {
    // Draw arena (big circle)
    draw_circle_lines(arena.origin_x, arena.origin_y, arena.radius, 2.0, BLACK);

    // Draw bounds (two boundary objects)
    draw_circle(
        arena.bounds.0.x,
        arena.bounds.0.y,
        arena.bounds.0.radius,
        RED,
    );
    draw_circle(
        arena.bounds.1.x,
        arena.bounds.1.y,
        arena.bounds.1.radius,
        RED,
    );

    // Draw player (smaller rotating circle)
    draw_circle(player.posx, player.posy, player.radius, player.color);
}

fn display_points(player: &Player) {
    draw_text(
        &format!("Points: {}", player.points.to_string()),
        screen_width() / 2.0 - 100.0,
        20.0,
        30.0,
        DARKGRAY,
    );
}

fn handle_player_input(player: &mut Player, arena: &mut Arena) -> bool {
    if is_key_pressed(KeyCode::X) {
        if player.action_possible(arena) {
            player.points += 1;
            player.speed += 0.2;
            arena.next_bounds();
            false
        } else {
            true
        }
    } else {
        false
    }
}

fn update_player_position(player: &mut Player, arena: &Arena, current_time: &mut f64) {
    if (get_time() - *current_time) > 0.01 {
        *current_time = get_time();
        player.step(arena);
    }
}

fn display_game_over(player: &Player) {
    let origin_x = screen_width() / 2.0;
    let origin_y = screen_height() / 2.0;

    let game_over_text = "Game Over!";
    let text_dimensions = measure_text(game_over_text, None, 50, 1.0);
    draw_text(
        game_over_text,
        origin_x - text_dimensions.width / 2.0,
        origin_y,
        50.0,
        RED,
    );

    let final_score_text = format!("Final Score: {}", player.points);
    let score_dimensions = measure_text(&final_score_text, None, 30, 1.0);
    draw_text(
        &final_score_text,
        origin_x - score_dimensions.width / 2.0,
        origin_y + 60.0,
        30.0,
        DARKGRAY,
    );

    let restart_text = "Press 'R' to restart";
    let restart_dimensions = measure_text(restart_text, None, 20, 1.0);
    draw_text(
        restart_text,
        origin_x - restart_dimensions.width / 2.0,
        origin_y + 100.0,
        20.0,
        DARKGRAY,
    );
}

fn handle_restart_input() -> bool {
    is_key_pressed(KeyCode::R)
}
