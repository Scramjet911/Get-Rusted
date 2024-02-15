use rand::Rng;
use std::{cmp::Ordering, io};

fn main() {
    let target = rand::thread_rng().gen_range(1..100);
    println!("Enter the guess");
    loop {
        let mut guess = String::new();
        println!("Input your guess");
        io::stdin()
            .read_line(&mut guess)
            .expect("Shit has gone wrong");
        println!("Guess was {guess}");
        // println!("Target: {target}");
        let guess_int: i32 = match guess.trim().parse() {
            Ok(val) => val,
            Err(_) => continue,
        };
        match guess_int.cmp(&target) {
            Ordering::Greater => println!("Too Large"),
            Ordering::Less => println!("Too Small"),
            Ordering::Equal => {
                println!("Winner");
                break;
            }
        }
    }
}
