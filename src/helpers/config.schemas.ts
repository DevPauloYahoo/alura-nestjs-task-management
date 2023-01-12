import * as Joi from 'joi';

export const CONFIG_VALIDATION_SCHEMA = Joi.object({
  PROFILE: Joi.string().required(),
  BD_HOST: Joi.string().required(),
  BD_PORT: Joi.string().default(5432).required(),
  BD_USERNAME: Joi.string().required(),
  BD_PASSWORD: Joi.string().required(),
  BD_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
