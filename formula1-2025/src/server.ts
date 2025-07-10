import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy" },
  { id: 5, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 7, name: "Kick Sauber", base: "Hinwil, Switzerland" },
  { id: 8, name: "Racing Bulls", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Haas", base: "Kannapolis, United States" }
];

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Liam Lawson", team: "Red Bull Racing" },
  { id: 3, name: "Charles Leclerc", team: "Ferrari" },
  { id: 4, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 5, name: "Lando Norris", team: "McLaren" },
  { id: 6, name: "Oscar Piastri", team: "McLaren" },
  { id: 7, name: "George Russell", team: "Mercedes" },
  { id: 8, name: "Andrea Kimi Antonelli", team: "Mercedes" },
  { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
  { id: 10, name: "Lance Stroll", team: "Aston Martin" },
  { id: 11, name: "Jack Doohan", team: "Alpine" },
  { id: 12, name: "Pierre Gasly", team: "Alpine" },
  { id: 13, name: "Esteban Ocon", team: "Haas" },
  { id: 14, name: "Oliver Bearman", team: "Haas" },
  { id: 15, name: "Gabriel Bortoleto", team: "Kick Sauber" },
  { id: 16, name: "Nico Hülkenberg", team: "Kick Sauber" },
  { id: 17, name: "Isack Hadjar", team: "Racing Bulls" },
  { id: 18, name: "Yuki Tsunoda", team: "Racing Bulls" },
  { id: 19, name: "Alexander Albon", team: "Williams" },
  { id: 20, name: "Carlos Sainz", team: "Williams" }
];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      response.type("application/json").code(200);
      return { driver };
    }
  }
);

server.listen({ port: 3333 }, () => {
  console.log("Server init");
});
