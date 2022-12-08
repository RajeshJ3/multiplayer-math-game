const get_domain = () => {
  if (process.env.NODE_ENV === "production") return "https://77gu7l.deta.dev";
  else return "http://localhost:8000";
};

export const DOMAIN = get_domain();
