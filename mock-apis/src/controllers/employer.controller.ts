import express from 'express';
import { Request, Response } from 'express';
import { Employer } from '../models/employer.model';
type RequestHandler = express.RequestHandler;

const employers: Employer[] = [
  { id: 1, name: 'Tech Solutions' },
  { id: 2, name: 'Innovatech' },
  { id: 3, name: 'Global Enterprises' }
];

/**
 * getAllEmployers
 * @param req 
 * @param res 
 */
export const getAllEmployers = (req: Request, res: Response) => {
  res.json(employers);
};

/**
 * createEmployer
 * @param req 
 * @param res 
 */
export const createEmployer: RequestHandler = (req, res): void => {
  const newEmployer: Employer = req.body;
  if (!newEmployer.name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  newEmployer.id = Math.floor(Math.random() * 1000);
  res.status(201).json(newEmployer);
};

/**
 * Update an existing employer
 * @param req 
 * @param res 
 * @returns 
 */
export const updateEmployer: RequestHandler = (req, res): void => {
  const employerId = parseInt(req.params.id, 10);
  if (isNaN(employerId)) {
    res.status(400).json({ error: 'Invalid employer ID' });
    return;
  }
  const updatedEmployer: Employer = req.body;
  if (!updatedEmployer.name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  updatedEmployer.id = employerId; // Maintain the same ID

  const employerIndex = employers.findIndex(e => e.id === employerId);
  if (employerIndex === -1) {
    res.status(400).json({ error: 'Employer not found' });
    return;
  }

  employers[employerIndex] = { ...updatedEmployer, id: employerId }; // Update the employer in the array

  res.status(200).json(updatedEmployer);
};

/**
 * Get an employer by ID
 * @param req 
 * @param res 
 * @returns 
 */
export const getEmployerById: RequestHandler = (req, res): void => {
  const employerId = parseInt(req.params.id, 10);
  if (isNaN(employerId)) {
    res.status(400).json({ error: 'Invalid employer ID' });
    return;
  }
  const employer = employers.find(e => e.id === employerId); 
  if (!employer) {
    res.status(404).json({ error: 'Employer not found' });
    return;
  }
  res.status(200).json(employer);
};

/**
 * Delete an employer by ID
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteEmployerById: RequestHandler = (req, res): void => {
  const employerId = parseInt(req.params.id, 10);
  if (isNaN(employerId)) {
    res.status(400).json({ error: 'Invalid employer ID' });
    return;
  }
  const employerIndex = employers.findIndex(e => e.id === employerId);
  if (employerIndex === -1) {
    res.status(404).json({ error: 'Employer not found' });
    return;
  }
  employers.splice(employerIndex, 1); // Remove the employer from the array
  res.status(200).send({
    message: 'Employer deleted successfully'
  });
};
