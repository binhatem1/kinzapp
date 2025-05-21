# 📘 **Project Overview Document**

---

## 1. 📖 Introduction

Welcome to the **Wallet System Documentation**!  
The wallet system allows users to manage their financial records including incomes and expenses. The system is simple, focusing on core **CRUD operations** related to financial entries.

---

## 2. 🎯 Objectives

- Provide users a platform to track their income and expenses.
    
- Enable secure authentication (**Sign Up** and **Sign In**).
    
- Maintain an organized and editable **dashboard** to view and manage financial transactions.
    

---

## 3. 📌 Scope

### ✅ In-scope:

- User Authentication (**Sign Up**, **Sign In**)
    
- Dashboard displaying financial entries
    
- Add/Edit/Delete **Income and Expenses**
    

### 🚫 Out-of-scope:

- **User Profile Editing** (e.g., updating password)
    

---

## 4. 👥 Entities and Roles

| Entity               | Role/Responsibilities                                         |
| -------------------- | ------------------------------------------------------------- |
| **User**             | Registers, logs in, adds/modifies/deletes income and expenses |
| **Admin (Optional)** | Could be added later for user management                      |

# 📄 **Functional Requirements Document (FRD)**

---

## 1️⃣ Functionality 1: User Authentication

**Description:**  
A user can register with a username, email, and password. After successful registration, the user can log in and access their dashboard.

### 🔹 Steps:

- **Sign Up**: Inputs – Username, Email, Password
    
- **Sign In**: Inputs – Email, Password
    
- **Authenticated sessions** are stored using JWT.
    

---

## 2️⃣ Functionality 2: Income & Expense Management

**Description:**  
Users can add, update, or delete financial entries marked as income or expense.

### 🔹 Features:

- Add Income or Expense with:  
    **Title**, **Amount**, **Date**, **Type (Income/Expense)**, **Category (optional)**
    
- Edit or Delete any existing entry
    
- View list of all entries on dashboard
    
- **Balance is dynamically calculated**



## **Technical Requirements Document (TRD)**

### **1. Architecture Overview**

A basic web application using a client-server model.

#### **Mermaid Architecture Diagram (Text Format)**

graph TD
    User -->|Sign Up / Sign In| Auth[Authentication Service]
    User -->|CRUD Operations| API[Wallet API Server]
    API --> DB[(Database)]
    API --> UI[Dashboard UI]

### **2. Components**

- **Frontend**: HTML/CSS, Typescirpt with React
    
- **Backend**: Node.js with Express 
    
- **Database**: MongoDB

### **3. Infrastructure Requirements**

- **Local Development**:
    
    - Node.js (v14+)
        
    - MongoDB/PostgreSQL

- **Third-party Services**:
    
    - bcrypt and JWT for authentication
        
    - dotenv for environment management

### **4. Development Tools**

- **IDE**: VSCode
    
- **Version Control**: Git & GitHub
    
- **Package Manager**: npm 
    
- **Libraries**:
    
    - express 
        
    - axios 
        
    - JWT and bcrypt


## **Database Schema Documentation (Updated)**

### **1. Tables / Collections**

#### **Users**

| Field    | Type       | Description     |
| -------- | ---------- | --------------- |
| id       | UUID / INT | Primary key     |
| username | String     | Unique username |
| password | String     | Hashed password |

#### **Transactions**

|Field|Type|Description|
|---|---|---|
|id|UUID / INT|Primary key|
|user_id|UUID / INT|Foreign key (References Users table)|
|name|String|Name/title of the transaction|
|description|Text|Detailed description of the transaction|
|amount|Decimal|Amount involved in the transaction|
|image|String / URL|Optional image reference or file path|
|rating|Integer|User-defined rating (e.g., 1 to 5)|
|type|Enum|'income' or 'expense'|


### **2. Relationships**

- A `User` can have multiple `Transactions`
    
- Each `Transaction` is linked to a `User` through `user_id`
    

---

### **3. Constraints**

- `username` in Users is **unique**
    
- `type` in Transactions is constrained to `'income'` or `'expense'`
    
- `rating` should be an integer, commonly between 1 and 5 (optional range validation)
    
- `image` is optional (can be null or empty)


# **API Template: Auth User**

---

### 📄 **Description**

Authenticate user. Returns a JWT token.

### 🌐 **Base URL**
https://localhost

### 🔧 **Endpoints**

**POST** `/authuser`

---

### 📥 **Parameters**
No parameters

### 📤 **Response**

Returns a JWT token.

---

### 📦 **Example**

#### ✅ **Request**
POST /

🧾 **Response**
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJqb2huX2RvZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE2Mjg5MjAwLCJleHAiOjE3MTYyOTI4MDB9.
  LkMTSk6R9KjVfKkHJURW6As1AaDmgUGzjXrEuDpgoLQ"
}
