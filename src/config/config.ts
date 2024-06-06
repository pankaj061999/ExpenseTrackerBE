import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import { ConnectOptions } from "mongoose";

dotenv.config({ path: path.join(__dirname, "../../.env") });

interface EnvVars {
  PORT?: number;
  MONGODB_URL: string;
}

const envVarsSchema = Joi.object<EnvVars>({
  PORT: Joi.number().integer().min(0).max(65535).description("Port number"),
  MONGODB_URL: Joi.string().required().description("Mongo DB url"),
}).unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env, {
  errors: { label: "key" },
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  port: envVars.PORT || 3003,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
  },
};

export default config;
