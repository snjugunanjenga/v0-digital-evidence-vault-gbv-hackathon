# Database Plan Report: Adding User Model and Relationships

## 1. Objective
To enhance the Digital Evidence Vault's data model by introducing a `User` entity to store user credentials and details, and to establish clear relationships between `User`, `Case`, and `Evidence` to support the application's functionality.

## 2. Current State Analysis
The existing `prisma/schema.prisma` defines `Case` and `Evidence` models.
-   `Case` model: Contains a `userId` field, indicating a link to a user, but lacks an explicit relation definition and a corresponding `User` model.
-   `Evidence` model: Also contains a `userId` field, suggesting a direct link to a user, alongside a relation to `Case`.

## 3. Proposed Schema Modifications

### 3.1. New `User` Model
A new `User` model will be introduced to manage user accounts.

```prisma
model User {
  id        String     @id @default(cuid())
  email     String     @unique
  // NOTE: Storing passwords in plain text is a significant security risk.
  // For production environments, it is strongly recommended to hash passwords
  // using a library like bcrypt before storing them.
  password  String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  cases     Case[]     // Defines a one-to-many relationship: A User can have many Cases.
}
```

### 3.2. Updated `Case` Model
The `Case` model will be updated to explicitly define its relationship with the `User` model.

```prisma
model Case {
  id          String    @id @default(cuid())
  title       String
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  userId      String    // Foreign key referencing the User's ID.
  user        User      @relation(fields: [userId], references: [id]) // Explicit relation to the User model.
  evidence    Evidence[]
}
```

### 3.3. `Evidence` Model Considerations
The `Evidence` model currently has a `userId` field. This might be redundant if all evidence is accessed through a `Case` that is already linked to a `User`. However, to maintain consistency with the existing structure and user request implicitly, this field will be retained. If evidence is intended to be managed independently of cases or linked to different users, this field serves a purpose. If not, it could potentially be removed to avoid data duplication or accessed via `evidence.case.user`. For this plan, it will remain as is.

```prisma
model Evidence {
  id          String    @id @default(cuid())
  fileName    String
  fileType    String
  fileHash    String    @unique
  uploadDate  DateTime  @default(now())
  caseId      String
  case        Case      @relation(fields: [caseId], references: [id])
  userId      String    // Retained as per existing schema and potential independent association.
}
```

## 4. Implementation Steps

1.  **Modify `prisma/schema.prisma`**: Update the file with the new `User` model and modifications to the `Case` model.
2.  **Generate and Apply Migration**: Execute `npx prisma migrate dev --name add_user_model` to create a new migration file and apply it to the database.
3.  **Push to Database**: The `prisma migrate dev` command will handle pushing the schema changes to the database.
4.  **Launch Prisma Studio**: Run `npx prisma studio` to visually inspect the database schema and data.

## 5. Security Note
The `password` field in the `User` model is stored in plain text as per the user's request. This is a critical security vulnerability. In a production environment, this field should be replaced with a hashed password using a robust algorithm like bcrypt.
