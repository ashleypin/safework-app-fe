import { Request, Response, Router } from 'express';
const incidentRouter: Router = Router();
import { IIncedent, Incident } from '../models/incident.js';
import mongoose from 'mongoose';

//GET (ALL)

incidentRouter.get('/', async (req: Request, res: Response) => {
    try {
        const incidents: mongoose.Document[] = await Incident.find();
        res.json(incidents);
    } catch (err: any) {
        res.json({ message: err.message })
    }
})


// GET (ID)
incidentRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const incident = await Incident.findById(req.params.id)
        res.json(incident);
    } catch (err: any) {
        res.json({ message: err.message })
    }
});


// CREATE
incidentRouter.post('/', async (req: Request, res: Response) => {

    //Instantiating a new person object to send to the database
    const incident: mongoose.Document = new Incident({
        title: req.body.title,
            description: req.body.description,
            photoPath: req.body.photoPath,
            reportedBy: req.body.reportedBy,
            workplaceId: req.body.workplaceId,
            status: req.body.status,
            //NOTE: THIS IS THE MONGOOSE DATE TYPE
            createdAt: req.body.createdAt,
            riskLevel: req.body.riskLevel
    })

    try {
        const newIncident: mongoose.Document = await incident.save()
        res.json(newIncident)
    } catch (err: any) {
        res.json({ message: err.message })
    }
})


// UPDATE

//NOTE: "can't set headers after response is sent to the client" error usually indicates you have competing responses
incidentRouter.patch('/:id', async (req: Request, res: Response) => {
    try {
        const incident = await Incident.findById(req.params.id);
        if (incident) {
            let workingCopy = incident.toObject();
            for (let key of Object.keys(workingCopy) as (keyof IIncedent)[]) {
                if(req.body[key]!= null){
                    incident[key] = req.body[key];
                }
            }

            const patchedIncident = await incident.save();
            res.json(patchedIncident);
        }
    } catch (err: any) {
        res.json({ message: err.message })
    }

})

// DELETE
incidentRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        await Incident.findByIdAndDelete(req.params.id);
        res.json({ message: "Deletion successful" });
    } catch (err: any) {
        res.json({ message: err.message })
    }


})

export default incidentRouter;