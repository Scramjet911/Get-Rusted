#![cfg_attr(not(test), no_std)]

pub mod model;
pub mod web;

pub use model::mnist;
extern crate alloc;
