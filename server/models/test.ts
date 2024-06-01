import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config.json'

interface IngredientAttributes {
  id: number;
  title: string;
  slug: string;
  postText: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface IngredientInput extends Optional<IngredientAttributes, 'id' | 'slug'> {}
export interface IngredientOuput extends Required<IngredientAttributes> {}
