// import { TDebug } from "../log";
// const debug = new TDebug("app:src:repositories:movies");
import * as P from "bluebird";
import * as serverlessMysql from "serverless-mysql";

// should be configurable
const mysql = serverlessMysql({
  config: {
    host     : "localhost",
    database : "cinema",
    user     : "foo",
    password : "bar",
    dateStrings: true
  }
});

const movie1 = {
  id: "1",
  title: "Assasins Creed",
  runtime: 115,
  format: "IMAX",
  plot: "Lorem ipsum dolor sit amet",
  released_at: "2018-12-01T00:00:00Z"
};

const movie2 = {
  id: "2",
  title: "Assasins Creed 2",
  runtime: 116,
  format: "IMAX MAX",
  plot: "Lorem ipsum dolor sit amet",
  released_at: "2018-12-01T00:00:00Z"
};

export class MovieRepository {
  public async getAllMovies(): P<any[]> {
    const results = await mysql.query("SELECT id, title, runtime, format, plot, DATE_FORMAT(released_at, \'%Y-%m-%dT%TZ\') as released_at FROM movie");

    await mysql.end();

    return results;
  }

  public async getMoviePremieres(): P<any[]> {
    const results = await mysql.query("SELECT id, title, runtime, format, plot, DATE_FORMAT(released_at, \'%Y-%m-%dT%TZ\') as released_at FROM movie");
    console.log(results);
    await mysql.end();

    return results;
  }

  public async getMovieById(id: string): P<any> {
    const results = await mysql.query(
      "SELECT id, title, runtime, format, plot, DATE_FORMAT(released_at, \'%Y-%m-%dT%TZ\') as released_at FROM movie WHERE id = ?",
      [id]
    );

    await mysql.end();

    return results;
  }
}