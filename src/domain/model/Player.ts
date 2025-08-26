export interface Player {
  id: number;
  userId: number;
  active: boolean;
  readonly createdAt?: Date;
  updatedAt?: Date;
}