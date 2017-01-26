import React, { PropTypes } from 'react';
import bsTables from '@union/bootstrap/lib/tables';

function parseType({ name, raw, value } = {}) {
  if (name === 'shape') {
    const nestedProps = [];

    for (const prop in value) {
      nestedProps.push(`${prop} : ${parseType(value[prop])}`);
    }

    return `${name}(${nestedProps.join(', ')})`;
  } else if (name === 'custom') {
    return raw;
  } else if (name === 'arrayOf') {
    return `${name}(${parseType(value)})`;
  } else {
    return name;
  }
}

function TableRow({ columns = [], header = false, ...props }) {
  const columnElement = header ? 'th' : 'td';

  return (
    <tr>
      {
        columns.map((element, key) => {
          return React.createElement(columnElement, { key }, element);
        })
      }
    </tr>
  );
}

function propTypesData({ data, name }) {
  const {
    defaultValue,
    description
  } = data;

  const propName = data.required ? `* ${name}` : name;
  const defaultValueString = defaultValue && defaultValue.value;

  return {
    name: propName,
    description,
    type: parseType(data.type),
    default: defaultValueString
  };
}

const has = Object.prototype.hasOwnProperty;
function propTypesDictionary(propTypesMetadata) {
  const data = [];
  for (const name in propTypesMetadata) {
    if (has.call(propTypesMetadata, name)) {
      data.push(propTypesData({ name, data: propTypesMetadata[name] }));
    }
  }

  return data;
}

/**
 * Use this component to render a table describing a component's propTypes
 */
export default function PropTypesTable({ metadata, exclude = [] }) {
  const shouldStay = columnName => exclude.indexOf(columnName) < 0;
  const columnsNames = ['name', 'description', 'type', 'default'].filter(shouldStay);

  const tableBody = propTypesDictionary(metadata).map((propTypeMetadata, key) => {
    const columnValues = columnsNames.map((columnName) => propTypeMetadata[columnName]);

    return <TableRow columns={columnValues} key={key} />
  });

  return (
    <table className={[bsTables.table, bsTables.tableInverse, bsTables.tableBordered].join(' ')}>
      <thead>
        <TableRow columns={columnsNames} header={true} />
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </table>
  );
}

const TypeShape = PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.any,
  computed: PropTypes.bool,
  require: PropTypes.bool
});

PropTypesTable.propTypes = {
  /**
   * props attribute from react-gen metadata
   */
  metadata: PropTypes.shape({
    type: TypeShape,
    description: PropTypes.string,
    defaultValue: PropTypes.shape({
      value: PropTypes.string
    })
  }).isRequired,
  /**
   * List of columns to exclude. Default columns are: "name", "description", "type", "default"
   */
  exclude: PropTypes.arrayOf(PropTypes.string)
}
