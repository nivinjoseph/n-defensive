# @nivinjoseph/n-defensive
Defensive programming library for TypeScript

## Overview
@nivinjoseph/n-defensive is a TypeScript library that provides a fluent interface for defensive programming and runtime type checking. It helps ensure type safety and validate values at runtime with a clean, chainable API.

## Installation
```bash
# Using npm
npm install @nivinjoseph/n-defensive

# Using yarn
yarn add @nivinjoseph/n-defensive
```

## Usage

### Basic Usage
```typescript
import { given } from "@nivinjoseph/n-defensive";

// Validate a string
given("hello", "greeting")
    .ensureHasValue()
    .ensureIsString();

// Validate a number
given(42, "age")
    .ensureHasValue()
    .ensureIsNumber();

// Validate an object
given({ name: "John" }, "person")
    .ensureHasValue()
    .ensureIsObject();
```

### Conditional Validation
```typescript
const shouldValidate = true;

given("hello", "greeting")
    .ensureHasValue(() => shouldValidate)
    .ensureIsString();
```

### Custom Validation
```typescript
given(42, "age")
    .ensure(age => age >= 18, "must be at least 18 years old");

// With conditional check
given(42, "age")
    .ensureWhen(shouldCheck, age => age >= 18, "must be at least 18 years old");
```

### Enum Validation
```typescript
enum Status {
    Active = "ACTIVE",
    Inactive = "INACTIVE"
}

given("ACTIVE", "status")
    .ensureIsEnum(Status);
```

### Array Validation
```typescript
given([1, 2, 3], "numbers")
    .ensureIsArray()
    .ensureIsNotEmpty();
```

### Object Structure Validation
```typescript
const personStructure = {
    name: "string",
    age: "number",
    address: {
        street: "string",
        city: "string",
        "zipCode?": "string"  // Optional field
    },
    "middleName?": "string",  // Optional field
    "nicknames?": ["string"]  // Optional array of strings
};

// All these are valid:
given({ 
    name: "John", 
    age: 30, 
    address: { 
        street: "Main", 
        city: "NY" 
    } 
}, "person").ensureHasStructure(personStructure);

given({ 
    name: "John", 
    age: 30, 
    address: { 
        street: "Main", 
        city: "NY",
        zipCode: "10001"
    },
    middleName: "James",
    nicknames: ["Johnny", "J"]
}, "person").ensureHasStructure(personStructure);
```

### Type Checking
```typescript
class Person { name: string; }

given(new Person(), "person")
    .ensureIsType(Person);

// Instance checking
class Animal { }
class Dog extends Animal { }

given(new Dog(), "pet")
    .ensureIsInstanceOf(Animal);
```

### Exhaustive Type Checking
```typescript
type Status = "active" | "inactive" | "pending";

function handleStatus(status: Status): string {
    switch (status) {
        case "active":
            return "User is active";
        case "inactive":
            return "User is inactive";
        case "pending":
            return "User is pending";
        default:
            return ensureExhaustiveCheck(status);
    }
}
```

## Error Handling
The library throws various exceptions from `@nivinjoseph/n-exception`:
- `ArgumentNullException`: When a required value is null/undefined
- `ArgumentException`: When a value fails validation
- `InvalidArgumentException`: When validation fails with a custom reason
- `InvalidOperationException`: When an operation is invalid
- `ApplicationException`: When an unexpected error occurs

## Contributing
Contributions are welcome! Please follow the existing code style and include tests for new features.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
