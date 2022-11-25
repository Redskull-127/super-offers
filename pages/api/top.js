import jsonData from "./top.json";

export default function handler(req, res) {
  res.status(200).json(jsonData);
}
