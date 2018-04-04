interface EnvOptions {
  ENV?: string;
  ROOT?: string;
  TEST?: boolean;
}

interface Config {
  branch?: string;
  email: string;
  password: string;
  token?: string;
  serverUrl: string;
  serverPassword?: string;
  winPath?: string;
  macPath?: string;
}
