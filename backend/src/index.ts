import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sequelize from './config/database';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import dossierRoutes from './routes/dossierRoutes';
import formulaireRoutes from './routes/formulaireRoutes';

// Configuration des variables d'environnement
dotenv.config();

// Création de l'application Express
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/dossiers', dossierRoutes);
app.use('/api/formulaires', formulaireRoutes);

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.send('API Fondation Horizons Nouveaux');
});

// Middleware de gestion des erreurs
app.use(errorHandler);

// Connexion à PostgreSQL et démarrage du serveur
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à PostgreSQL établie avec succès');
    
    // Synchroniser les modèles avec la base de données
    // En développement, vous pouvez utiliser { force: true } pour recréer les tables
    await sequelize.sync({ alter: true });
    console.log('Modèles synchronisés avec la base de données');
    
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur de connexion à PostgreSQL:', error);
    process.exit(1);
  }
};

startServer();

export default app;