import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/sequelize";

export interface AdminAttributes {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  status: string;
  deleted_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface AdminCreationAttributes
  extends Optional<
    AdminAttributes,
    "id" | "deleted_at" | "created_at" | "updated_at"
  > {}

export class Admin
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes
{
  public id!: string;
  public first_name!: string;
  public last_name!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public status!: string;
  public deleted_at?: Date | null;
  public created_at?: Date;
  public updated_at?: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },

    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "admins",
    timestamps: true, // ENABLE timestamp fields
    paranoid: true,   // ENABLE soft delete
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

export default Admin;
