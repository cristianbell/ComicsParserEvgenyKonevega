import { json, urlencoded } from 'express';

export default [json(), urlencoded({ extended: true })];
