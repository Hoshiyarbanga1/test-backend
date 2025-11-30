"use strict";
// import { Admin } from './admin.entity';
// import { AdminDetail } from './adminDetail.entity';
// import { PgList } from './pgList.entity';
// import { Amenities } from './amenities.entity';
// import { PgAmenities } from './pgAmenities.entity';
// import { PgPictures } from './pgPictures.entity';
// import { PgType } from './pgType.entity';
// import { PgAddress } from './pgAddress.entity';
// import { ForPg } from './forPg.entity';
// import { PgFor } from './pgFor.entity';
// // Register associations here to avoid circular import issues
// // Admin associations
// Admin.hasOne(AdminDetail, { foreignKey: 'admin_id', as: 'detail' });
// AdminDetail.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin' });
// // PG List associations
// Admin.hasMany(PgList, { foreignKey: 'added_by', as: 'pgLists' });
// PgList.belongsTo(Admin, { foreignKey: 'added_by', as: 'addedBy' });
// // PG Pictures associations
// PgList.hasMany(PgPictures, { foreignKey: 'pg_id', as: 'pictures' });
// PgPictures.belongsTo(PgList, { foreignKey: 'pg_id', as: 'pg' });
// // PG Address associations (One-to-One)
// PgList.hasOne(PgAddress, { foreignKey: 'pg_id', as: 'addressDetails' });
// PgAddress.belongsTo(PgList, { foreignKey: 'pg_id', as: 'pg' });
// // PG Amenities associations (Many-to-Many through junction table)
// // Using direct many-to-many relationships
// PgList.belongsToMany(Amenities, { 
//   through: PgAmenities, 
//   foreignKey: 'pg_id', 
//   otherKey: 'amenity_id',
//   as: 'amenities'
// });
// Amenities.belongsToMany(PgList, { 
//   through: PgAmenities, 
//   foreignKey: 'amenity_id', 
//   otherKey: 'pg_id',
//   as: 'pgLists'
// });
// // PG For associations (Many-to-Many through junction table)
// // Using direct many-to-many relationships
// PgList.belongsToMany(ForPg, { 
//   through: PgFor, 
//   foreignKey: 'pg_id', 
//   otherKey: 'for_pg_id',
//   as: 'forCategories'
// });
// ForPg.belongsToMany(PgList, { 
//   through: PgFor, 
//   foreignKey: 'for_pg_id', 
//   otherKey: 'pg_id',
//   as: 'pgLists'
// });
// export { 
//   Admin, 
//   AdminDetail, 
//   PgList, 
//   Amenities, 
//   PgAmenities,
//   PgPictures,
//   PgType,
//   PgAddress,
//   ForPg,
//   PgFor
// };
