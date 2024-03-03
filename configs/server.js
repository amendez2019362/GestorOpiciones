'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import userRoutes from '../src/user/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import commentRoutes from '../src/comment/comment.routes.js';
import publicationRoutes from '../src/publication/publication.routes.js';
import { dbConnection } from './mongo.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.loginPath = '/GestorOpiniones/v1/login';
        this.registUserPath = '/GestorOpiniones/v1/registUser';
        this.editUserPath = '/GestorOpiniones/v1/userEdit';
        this.newPublicationPath = '/GestorOpiniones/v1/newPublication';
        this.editPublicationPath= '/GestorOpiniones/v1/editPublication';
        this.deletePublicationPath = '/GestorOpiniones/v1/deletePublication';
        this.viewPublicationPath = '/GestorOpiniones/v1/viewPublication';
        this.newCommentPath = '/GestorOpiniones/v1/newComment';
        this.editCommentPath = '/GestorOpiniones/v1/editComment';
        this.deleteCommentPath = '/GestorOpiniones/v1/deleteComment';
        this.viewCommentPath = '/GestorOpiniones/v1/viewComment';

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }

    routes(){
        this.app.use(this.loginPath, authRoutes);
        this.app.use(this.registUserPath, userRoutes);
        this.app.use(this.editUserPath, userRoutes);
        this.app.use(this.newPublicationPath, publicationRoutes);
        this.app.use(this.editPublicationPath, publicationRoutes);
        this.app.use(this.deletePublicationPath, publicationRoutes);
        this.app.use(this.viewPublicationPath, publicationRoutes);
        this.app.use(this.newCommentPath, commentRoutes);
        this.app.use(this.viewCommentPath, commentRoutes);
        this.app.use(this.editCommentPath, commentRoutes);
        this.app.use(this.deleteCommentPath, commentRoutes);
        
    }
}

export default Server;