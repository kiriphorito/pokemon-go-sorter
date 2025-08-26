import { NextFunction, Request, Response } from "express";
import { searchPokemon } from "../domain/service/searchPokemon";

export const pokemonLookup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchQuery = req.query.search as string;
    if (!searchQuery) {
      throw new Error("Cannot look for nothing!")
    }
    const result = await searchPokemon(searchQuery);
    res.json(result);
  } catch (error) {
    next(error);
  }
}