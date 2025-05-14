import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

interface DossierAttributes {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  sexe: 'M' | 'F';
  commune: string;
  quartier?: string;
  parentNom: string;
  parentTelephone?: string;
  parentEmail?: string;
  diagnostic?: string;
  statut: 'Nouveau' | 'En cours' | 'Incomplet' | 'Accepté' | 'Rejeté' | 'Clôturé';
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DossierCreationAttributes extends Optional<DossierAttributes, 'id' | 'quartier' | 'parentTelephone' | 'parentEmail' | 'diagnostic' | 'createdAt' | 'updatedAt'> {}

class Dossier extends Model<DossierAttributes, DossierCreationAttributes> implements DossierAttributes {
  public id!: string;
  public nom!: string;
  public prenom!: string;
  public dateNaissance!: Date;
  public sexe!: 'M' | 'F';
  public commune!: string;
  public quartier?: string;
  public parentNom!: string;
  public parentTelephone?: string;
  public parentEmail?: string;
  public diagnostic?: string;
  public statut!: 'Nouveau' | 'En cours' | 'Incomplet' | 'Accepté' | 'Rejeté' | 'Clôturé';
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Dossier.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateNaissance: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sexe: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false
    },
    commune: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quartier: {
      type: DataTypes.STRING
    },
    parentNom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentTelephone: {
      type: DataTypes.STRING
    },
    parentEmail: {
      type: DataTypes.STRING
    },
    diagnostic: {
      type: DataTypes.TEXT
    },
    statut: {
      type: DataTypes.ENUM('Nouveau', 'En cours', 'Incomplet', 'Accepté', 'Rejeté', 'Clôturé'),
      defaultValue: 'Nouveau'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Dossier',
    tableName: 'dossiers'
  }
);

// Définir les associations
Dossier.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Dossier, { foreignKey: 'userId', as: 'dossiers' });

export default Dossier;