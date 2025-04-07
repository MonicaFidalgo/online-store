import datastore from "../mocks/datastore";
import { OperatorId, Property } from "../types";

export const getPropertyValidOperators = (property: Property | undefined) => {
  if (!property) return [];

  const allOperators = datastore.getOperators();

  switch (property.type) {
    case "string":
      return allOperators.filter((op) =>
        [
          OperatorId.Equals,
          OperatorId.Contains,
          OperatorId.Any,
          OperatorId.None,
          OperatorId.In,
        ].includes(op.id as OperatorId)
      );

    case "number":
      return allOperators.filter((op) =>
        [
          OperatorId.Equals,
          OperatorId.GreaterThan,
          OperatorId.LessThan,
          OperatorId.Any,
          OperatorId.None,
        ].includes(op.id as OperatorId)
      );

    case "enumerated":
      return allOperators.filter((op) =>
        [
          OperatorId.Equals,
          OperatorId.In,
          OperatorId.Any,
          OperatorId.None,
        ].includes(op.id as OperatorId)
      );

    default:
      return [];
  }
};
