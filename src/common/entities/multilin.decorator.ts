import { ColumnType, Column as TypeORMColumn } from 'typeorm';

export function isMultilingual(type: ColumnType): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    TypeORMColumn({ type })(target, propertyKey);
    TypeORMColumn({ type, nullable: true, name: propertyKey.toString() + '_eng' })(target, propertyKey.toString() + '_eng');
    TypeORMColumn({ type, nullable: true, name: propertyKey.toString() + '_gd' })(target, propertyKey.toString() + '_gd');
  };
}
