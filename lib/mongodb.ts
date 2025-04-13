import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const BASE_DB_NAME = process.env.MONGODB_DB;

declare global {
  var _mongooseCache: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

export async function connectToSharedDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URI}/${BASE_DB_NAME}`);
  }

  try {
    const mongooseInstance = await cached.promise;
    cached.conn = mongooseInstance.connection;
    console.log(cached.conn);
    console.log("connection created!!!!!!!!!!!!!!!!!");
    return cached.conn;
  } catch (error) {
    console.error("MongoDB Shared DB Connection Error:", error);
    throw new Error("Failed to connect to shared MongoDB");
  }
}

export async function connectToTenantDatabase(tenantId: string): Promise<mongoose.Connection> {
  const tenantDbUri = `${MONGODB_URI}/${BASE_DB_NAME}_${tenantId}`;
  const tenantConnection = await mongoose.createConnection(tenantDbUri).asPromise();
  console.log(tenantConnection);
  console.log("connection created!!!!!!!!!!!!!!!!!");
  return tenantConnection;
}
