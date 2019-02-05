// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Fetch = require("bs-fetch/src/Fetch.js");
var React = require("react");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Button$Nfldraftreason = require("./Button.bs.js");
var PlayerCard$Nfldraftreason = require("./PlayerCard.bs.js");

var rootUrl = "http://localhost:8080/";

function p(json) {
  return /* record */[
          /* drafted */Json_decode.field("drafted", Json_decode.bool, json),
          /* id */Json_decode.field("id", Json_decode.$$int, json),
          /* name */Json_decode.field("name", Json_decode.string, json),
          /* position */Json_decode.field("position", Json_decode.string, json),
          /* school */Json_decode.field("school", Json_decode.string, json)
        ];
}

function players(json) {
  return Json_decode.array(p, json);
}

var Decode = /* module */[
  /* p */p,
  /* players */players
];

var component = ReasonReact.reducerComponent("PlayerList");

function make() {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (self) {
              return Curry._1(self[/* send */3], /* PlayersFetch */0);
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              var match = self[/* state */1];
              if (typeof match === "number") {
                if (match !== 0) {
                  return React.createElement("div", undefined, "Loading...");
                } else {
                  return React.createElement("div", undefined, "An error occurred!");
                }
              } else {
                var players = match[0];
                var undraftedPlayers = $$Array.of_list(List.filter((function (player) {
                              return player[/* drafted */0] === false;
                            }))($$Array.to_list(players)));
                var num = undraftedPlayers.length;
                var draftedPlayers = $$Array.of_list(List.filter((function (player) {
                              return player[/* drafted */0] === true;
                            }))($$Array.to_list(players)));
                var num$1 = draftedPlayers.length;
                return React.createElement("div", undefined, React.createElement("h3", undefined, "NFL Draft Reason"), ReasonReact.element(undefined, undefined, Button$Nfldraftreason.make((function () {
                                      return Curry._1(self[/* send */3], /* PlayersFetch */0);
                                    }), "Refetch players", /* array */[])), ReasonReact.element(undefined, undefined, Button$Nfldraftreason.make((function () {
                                      return Curry._1(self[/* send */3], /* Reset */2);
                                    }), "Reset all", /* array */[])), React.createElement("div", {
                                className: "container"
                              }, React.createElement("div", {
                                    className: "players undrafted-section"
                                  }, React.createElement("h3", undefined, "undrafted players"), React.createElement("div", undefined, num !== 0 ? $$Array.map((function (player) {
                                                return ReasonReact.element(String(player[/* id */1]), undefined, PlayerCard$Nfldraftreason.make(player[/* name */2], player[/* id */1], player[/* drafted */0], (function () {
                                                                  return Curry._1(self[/* send */3], /* DraftPlayer */Block.__(1, [String(player[/* id */1])]));
                                                                }), player[/* position */3], player[/* school */4], /* array */[]));
                                              }), undraftedPlayers) : React.createElement("p", undefined, "no undrafted players"))), React.createElement("div", {
                                    className: "players drafted-section"
                                  }, React.createElement("h3", undefined, "drafted players"), React.createElement("div", undefined, num$1 !== 0 ? $$Array.map((function (player) {
                                                return ReasonReact.element(String(player[/* id */1]), undefined, PlayerCard$Nfldraftreason.make(player[/* name */2], player[/* id */1], player[/* drafted */0], (function () {
                                                                  return /* () */0;
                                                                }), player[/* position */3], player[/* school */4], /* array */[]));
                                              }), draftedPlayers) : React.createElement("p", undefined, "no drafted players")))));
              }
            }),
          /* initialState */(function () {
              return /* Loading */1;
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, _) {
              if (typeof action === "number") {
                switch (action) {
                  case 0 : 
                      return /* UpdateWithSideEffects */Block.__(2, [
                                /* Loading */1,
                                (function (self) {
                                    fetch("http://localhost:8080/players/", Fetch.RequestInit[/* make */0](undefined, undefined, undefined, undefined, undefined, /* CORS */3, undefined, undefined, undefined, undefined, undefined)(/* () */0)).then((function (prim) {
                                                return prim.json();
                                              })).then((function (json) {
                                              var players = Json_decode.array(p, json);
                                              return Promise.resolve(Curry._1(self[/* send */3], /* PlayersFetched */Block.__(0, [players])));
                                            })).catch((function (err) {
                                            console.log(err);
                                            return Promise.resolve(Curry._1(self[/* send */3], /* PlayersFailedToFetch */1));
                                          }));
                                    return /* () */0;
                                  })
                              ]);
                  case 1 : 
                      return /* Update */Block.__(0, [/* Error */0]);
                  case 2 : 
                      return /* UpdateWithSideEffects */Block.__(2, [
                                /* Loading */1,
                                (function (self) {
                                    fetch("http://localhost:8080/reset", Fetch.RequestInit[/* make */0](undefined, undefined, undefined, undefined, undefined, /* CORS */3, undefined, undefined, undefined, undefined, undefined)(/* () */0)).then((function (prim) {
                                                return prim.json();
                                              })).then((function () {
                                              return Promise.resolve(Curry._1(self[/* send */3], /* PlayersFetch */0));
                                            })).catch((function (err) {
                                            console.log(err);
                                            return Promise.resolve(Curry._1(self[/* send */3], /* PlayersFetch */0));
                                          }));
                                    return /* () */0;
                                  })
                              ]);
                  
                }
              } else if (action.tag) {
                var id = action[0];
                return /* UpdateWithSideEffects */Block.__(2, [
                          /* Loading */1,
                          (function (self) {
                              fetch(rootUrl + ("players/" + id), Fetch.RequestInit[/* make */0](/* Post */2, undefined, undefined, undefined, undefined, /* CORS */3, undefined, undefined, undefined, undefined, undefined)(/* () */0)).then((function (prim) {
                                          return prim.json();
                                        })).then((function () {
                                        return Promise.resolve(Curry._1(self[/* send */3], /* PlayersFetch */0));
                                      })).catch((function (err) {
                                      console.log(err);
                                      return Promise.resolve(Curry._1(self[/* send */3], /* PlayersFetch */0));
                                    }));
                              return /* () */0;
                            })
                        ]);
              } else {
                return /* Update */Block.__(0, [/* Loaded */[action[0]]]);
              }
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

exports.rootUrl = rootUrl;
exports.Decode = Decode;
exports.component = component;
exports.make = make;
/* component Not a pure module */
