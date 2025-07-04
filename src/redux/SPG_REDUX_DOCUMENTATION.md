# SPG Redux Documentation (Unified Structure)

## Overview

SPG Redux module telah diimplementasikan dengan struktur unified yang mengelola state untuk 4 jenis SPG (Sales Promotion Girl):

- **Import**: SPG untuk produk import
- **Bawang**: SPG untuk produk bawang
- **Kawat**: SPG untuk produk kawat
- **Lain**: SPG untuk produk lainnya

## State Structure (COMPLETED ✅)

```javascript
state.spg = {
  import: {
    data: [],
    currentItem: null,
    loading: false,
    message: null,
    errorCode: null,
    errorMessage: null,
  },
  bawang: {
    data: [],
    currentItem: null,
    loading: false,
    message: null,
    errorCode: null,
    errorMessage: null,
  },
  kawat: {
    data: [],
    currentItem: null,
    loading: false,
    message: null,
    errorCode: null,
    errorMessage: null,
  },
  lain: {
    data: [],
    currentItem: null,
    loading: false,
    message: null,
    errorCode: null,
    errorMessage: null,
  },
};
```

## Actions (COMPLETED ✅)

### Generic Actions (Recommended)

```javascript
import {
  fetchSPGRequest,
  addSPGRequest,
  updateSPGRequest,
  deleteSPGRequest,
  resetSPGMessages,
} from "../redux/actions/spgActions";

// Fetch all SPG import
dispatch(fetchSPGRequest("import"));

// Add new SPG bawang
dispatch(addSPGRequest("bawang", newSPGData));

// Update SPG kawat
dispatch(updateSPGRequest("kawat", updatedData));

// Delete SPG lain
dispatch(deleteSPGRequest("lain", spgId));

// Reset messages
dispatch(resetSPGMessages("import"));
```

### Helper Actions (Alternative)

```javascript
import {
  fetchSPGImportRequest,
  addSPGBawangRequest,
  updateSPGKawatRequest,
  deleteSPGLainRequest,
  resetSPGImportMessages,
} from "../redux/actions/spgActions";

// Fetch
dispatch(fetchSPGImportRequest());

// Add
dispatch(addSPGBawangRequest(newSPGData));

// Update
dispatch(updateSPGKawatRequest(updatedData));

// Delete
dispatch(deleteSPGLainRequest(spgId));

// Reset
dispatch(resetSPGImportMessages());
```

## Usage in Components (COMPLETED ✅)

### Using useSelector to Access State

```javascript
import { useSelector } from "react-redux";

function SPGImportComponent() {
  const { data, loading, message, errorMessage } = useSelector(
    (state) => state.spg.import
  );

  return (
    <div>
      {loading && <p>Loading...</p>}
      {message && <p className="success">{message}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Complete Component Example

```javascript
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSPGRequest,
  addSPGRequest,
  resetSPGMessages,
} from "../redux/actions/spgActions";

function SPGBawangManagement() {
  const dispatch = useDispatch();
  const { data, loading, message, errorMessage } = useSelector(
    (state) => state.spg.bawang
  );

  useEffect(() => {
    dispatch(fetchSPGRequest("bawang"));
  }, [dispatch]);

  const handleAddSPG = (newSPGData) => {
    dispatch(addSPGRequest("bawang", newSPGData));
  };

  const handleResetMessages = () => {
    dispatch(resetSPGMessages("bawang"));
  };

  return (
    <div>
      <h2>SPG Bawang Management</h2>
      {loading && <div>Loading...</div>}
      {message && (
        <div className="alert alert-success">
          {message}
          <button onClick={handleResetMessages}>×</button>
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-error">
          {errorMessage}
          <button onClick={handleResetMessages}>×</button>
        </div>
      )}
      {/* Your component content here */}
    </div>
  );
}

export default SPGBawangManagement;
```

## Available Actions for Each SPG Type

### Fetch Operations

- `fetchSPGRequest(spgType)` - Fetch all SPG data
- `fetchSPGByIdRequest(spgType, id)` - Fetch SPG by ID

### CRUD Operations

- `addSPGRequest(spgType, data)` - Add new SPG
- `updateSPGRequest(spgType, data)` - Update existing SPG
- `deleteSPGRequest(spgType, id)` - Delete SPG

### Utility Operations

- `resetSPGMessages(spgType)` - Reset all messages and errors

## SPG Types

- `'import'` - For import products
- `'bawang'` - For onion products
- `'kawat'` - For wire products
- `'lain'` - For other products

## Error Handling

The Redux module provides comprehensive error handling:

- API errors are caught and stored in `errorMessage`
- Error codes are stored in `errorCode`
- Loading states are properly managed
- Success messages are provided for user feedback

## Files Structure (COMPLETED ✅)

```
src/
├── api/
│   └── spg.js                    # API functions for all SPG types
├── redux/
│   ├── actions/
│   │   └── spgActions.js        # Unified action creators
│   ├── reducers/
│   │   └── spgReducer.js        # Single unified reducer
│   ├── sagas/
│   │   └── spgSaga.js           # Generic saga implementation
│   ├── rootReducer.js           # Updated with spg: spgReducer
│   └── rootSaga.js              # Updated with spgSaga
```

## Implementation Status ✅ COMPLETED

### ✅ API Layer (spg.js)

- CRUD operations for all 4 SPG types
- Consistent method naming pattern
- Error handling with try-catch

### ✅ Redux Actions (spgActions.js)

- Generic actions with spgType parameter
- Helper actions for easier usage
- All CRUD operations covered

### ✅ Redux Reducer (spgReducer.js)

- Unified reducer managing all SPG types
- State structure: `state.spg.{import|bawang|kawat|lain}`
- Consistent state management pattern

### ✅ Redux Saga (spgSaga.js)

- Generic saga implementation
- Dynamic API method calling
- Comprehensive error handling

### ✅ Root Configuration

- rootReducer.js updated with unified spg reducer
- rootSaga.js updated with spgSaga
- State structure: `state.spg` instead of separate reducers

## Migration from Old Structure

If you have existing components using the old structure:

**Old way:**

```javascript
const { data } = useSelector((state) => state.spgImport);
```

**New way:**

```javascript
const { data } = useSelector((state) => state.spg.import);
```

The SPG Redux module is now fully implemented and ready to use! 🎉

</td>
</tr>
))}
</tbody>
</table>

      {/* Modal for create/edit */}
      {showModal && (
        <SPGImportModal
          currentItem={currentSPGImport}
          onSubmit={currentSPGImport ? handleUpdate : handleCreate}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>

);
};

export default SPGImportPage;

````

## API Integration (Same as Stock Pattern)
Redux saga akan otomatis memanggil API dari `/src/api/spg.js`:
- `spgImportAPI.getAllSPGImport()` untuk fetch all data
- `spgImportAPI.getSPGImportById(id)` untuk fetch by ID
- `spgImportAPI.createSPGImport(data)` untuk create
- `spgImportAPI.updateSPGImport(id, data)` untuk update
- `spgImportAPI.deleteSPGImport(id)` untuk delete

## Key Differences from Previous Version

### ✅ **Improvements (Following Stock Pattern):**
1. **State Structure**:
   - `data` → `spgImport` (array data seperti `stocks`)
   - `currentItem` → `currentSPGImport` (seperti `currentStock`)

2. **New Actions**:
   - `fetchSPGImportByIdRequest/Success/Failure` - untuk fetch detail by ID
   - `resetSPGImportMessages` - untuk reset messages

3. **Saga Structure**:
   - Menggunakan `takeLatest` untuk semua operations
   - Function naming tanpa suffix 'Saga'
   - Direct function export tanpa watcher functions

4. **Reducer Structure**:
   - Konsisten dengan stockReducer pattern
   - Proper error handling dan message management
   - Loading state management yang sama

### ❌ **Removed Features:**
1. **Filter Actions & Reducer** - Disederhanakan, filter bisa dihandle di component level
2. **Set/Clear Current Actions** - Diganti dengan fetchById pattern
3. **Helper Functions** - Disederhanakan

## Migration Guide

### From Previous Version:
```javascript
// OLD
const { data, currentItem } = useSelector(state => state.spgImport);
dispatch(setCurrentSPGImport(item));

// NEW
const { spgImport, currentSPGImport } = useSelector(state => state.spgImport);
dispatch(fetchSPGImportByIdRequest(id));
````

## API Response Structure

SPG API mengembalikan response dengan struktur pagination sebagai berikut:

```javascript
{
  "count": 1,              // Total jumlah data
  "total_pages": 1,        // Total halaman
  "current_page": 1,       // Halaman saat ini
  "next": null,           // URL halaman berikutnya
  "previous": null,       // URL halaman sebelumnya
  "data": [               // Array data SPG
    {
      "id": 2,
      "document_number": "2025-07/SPG-B/001",
      "document_type": "BAWANG",
      "warehouse": 2,
      "warehouse_name": "G3-Updated",
      "container_number": "",
      "vehicle_number": "",
      "sj_number": "SJ-BWG-002",
      "start_unload": "",
      "finish_load": "",
      "user": 3,
      "user_email": "super@user.com",
      "transaction_date": "2025-07-03T16:10:40.255537Z",
      "created_at": "2025-07-03T16:10:40.255678Z",
      "updated_at": "2025-07-03T16:10:40.255690Z",
      "items": [
        {
          "id": 2,
          "product": 1,
          "product_name": "Kembang Api Tes",
          "product_code": "PROD001",
          "carton_quantity": 200,
          "pack_quantity": 20,
          "packaging_size": "24/50/10",
          // ... other item fields
        }
      ]
    }
  ]
}
```

## State Structure (UPDATED ✅)
