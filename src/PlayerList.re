/* TODO: find out how to use env vars and make this dynamic */
let rootUrl = "http://localhost:8080/";

type player = {
  drafted: bool,
  id: int,
  name: string,
  position: string,
  school: string,
};

/* FIXME: stop using modules here! */
module Decode = {
  let p = json : player =>
    Json.Decode.{
      id: json |> field("id", int),
      name: json |> field("name", string),
      school: json |> field("school", string),
      position: json |> field("position", string),
      drafted: json |> field("drafted", bool),
    }
  let players = json : array(player) => Json.Decode.array(p, json)
};

type state =
  | Error
  | Loading
  | Loaded(array(player))

type action =
  | PlayersFetch
  | PlayersFetched(array(player))
  | PlayersFailedToFetch/* Js.Promise.error */
  | DraftPlayer(string);

let component = ReasonReact.reducerComponent("PlayerList");

let make = (_children) => {
  ...component,
  initialState: _state => Loading,
  reducer: (action, _state) =>
    switch action {
    | PlayersFetched(players) => ReasonReact.Update(Loaded(players))
    | PlayersFailedToFetch => ReasonReact.Update(Error)      
    | PlayersFetch =>
      ReasonReact.UpdateWithSideEffects(
        Loading,
        (
          self =>
          Js.Promise.(
            Fetch.fetchWithInit(
              rootUrl ++ "players/",
              Fetch.RequestInit.make(
                ~mode=Fetch.CORS,
                (),
              ),
            )
            |> then_(Fetch.Response.json)
            |> then_(json =>
                json
                |> Decode.players
                |> (players => self.send(PlayersFetched(players)))
                |> resolve
              )
            |> catch(err => {
                Js.log(err)
                Js.Promise.resolve(self.send(PlayersFailedToFetch))
            })
            |> ignore
          )
        ),
      )
    | DraftPlayer(id) => ReasonReact.UpdateWithSideEffects(
      Loading,
      (
        self =>
        Js.Promise.(
          Fetch.fetchWithInit(
            rootUrl ++ "players/" ++ id,
            Fetch.RequestInit.make(
              ~mode=Fetch.CORS,
              ~method_=Fetch.Post,
              /* ~body=Fetch.BodyInit.make(Js.Json.stringify(Js.Json.object_(payload))), */
              (),
            ),
          )
          |> then_(Fetch.Response.json)
          |> then_(_json =>
              Js.Promise.resolve(self.send(PlayersFetch))
            )
          |> catch(err => {
              Js.log(err)
              Js.Promise.resolve(self.send(PlayersFetch))
          })
          |> ignore
        )
      ),
    )
  },
  didMount: self => self.send(PlayersFetch),
  render: self => {
    switch (self.state) {
    | Error => <div> (ReasonReact.string("An error occurred!")) </div>
    | Loading => <div> (ReasonReact.string("Loading...")) </div>
    | Loaded(players) =>
      <div>
        <h3> (ReasonReact.string("NFL Draft Reason")) </h3>

        <Button func={_evt => self.send(PlayersFetch)} message="Refetch players" />

        <div className="container">
          <div className="players undrafted-section">
            <h3> (ReasonReact.string("undrafted players")) </h3>
            <ul>
              (
                players
                |> Array.to_list
                |> List.filter(player => player.drafted == false)
                |> Array.of_list
                |> Array.map(player =>
                  <div key=string_of_int(player.id)>
                    <PlayerCard
                      name = player.name
                      id = player.id
                      drafted = player.drafted
                      draft=(_event => self.send(DraftPlayer(string_of_int(player.id))))
                      /* draft = ((_event) => Js.log("clicked! " ++ string_of_int(player.id))) */
                      position = player.position
                      school = player.school
                    />
                  </div>
                )
                |> ReasonReact.array
              )
            </ul>
          </div>

          <div className="players drafted-section">
            <h3> (ReasonReact.string("drafted players")) </h3>
            <ul>
              (
                players
                |> Array.to_list
                |> List.filter(player => player.drafted == true)
                |> Array.of_list
                |> Array.map(player =>
                  <div key=string_of_int(player.id)>
                    <PlayerCard
                      name = player.name
                      id = player.id
                      drafted = player.drafted
                      draft = ((_event) => Js.log("clicked! " ++ string_of_int(player.id)))
                      position = player.position
                      school = player.school
                    />
                  </div>
                )
                |> ReasonReact.array
              )
            </ul>
          </div>
        </div>
      </div>
    }
  }
}
