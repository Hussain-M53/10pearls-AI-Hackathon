declare namespace globalThis {
    let mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
  }