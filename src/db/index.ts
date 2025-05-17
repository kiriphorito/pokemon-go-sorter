// @ts-ignore
import knexFile from '../../knexfile.js';
import { knex } from 'knex';

const knexInstance = knex(knexFile);
export default knexInstance;