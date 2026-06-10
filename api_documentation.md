Base API: http://localhost:8080/api

---

# 1. Controller: AdminAssignStaffController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: assignStaff: POST /admin/assign-staff
**Role:** `ADMIN`
Assigns a staff member (Receptionist/Cleaner) to a shift on a specific work date.

### Request Body (JSON)
All fields are required. `workDate` must be present or in the future.
```json
{
  "userId": 10,
  "staffId": 2,
  "shiftId": 1,
  "workDate": "2026-06-01"
}
```
*Constraints:*
- `userId`: `@NotNull(message = "USER_ID_REQUIRED")`
- `staffId`: `@NotNull(message = "STAFF_ROLE_ID_REQUIRED")`
- `shiftId`: `@NotNull(message = "SHIFT_ID_REQUIRED")`
- `workDate`: `@NotNull(message = "WORK_DATE_REQUIRED")`, `@FutureOrPresent(message = "WORK_DATE_INVALID")` (Format: `YYYY-MM-DD`)

### Parameters
*None*

### Success Response (JSON)
*HTTP Status 200 OK*
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 1,
    "userId": 10,
    "fullName": "Staff Member A",
    "email": "staff_a@hotel.com",
    "role": "RECEPTIONIST",
    "staffRoleId": 2,
    "staffRole": "RECEPTIONIST",
    "baseSalary": 25.0,
    "shiftId": 1,
    "shiftName": "Morning Shift",
    "startTime": "08:00:00",
    "endTime": "16:00:00",
    "workDate": "2026-06-01"
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

### Error Response (JSON)
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": {
    "workDate": "WORK_DATE_INVALID"
  },
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------------------------------------------------

## API: getCurrentWeekAssignments: GET /admin/assign-staff/current-week
**Role:** `ADMIN`
Retrieves all staff shift assignments for the current week.

### Parameters
*None*

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": [
    {
      "id": 1,
      "userId": 10,
      "fullName": "Staff Member A",
      "email": "staff_a@hotel.com",
      "role": "RECEPTIONIST",
      "staffRoleId": 2,
      "staffRole": "RECEPTIONIST",
      "baseSalary": 25.0,
      "shiftId": 1,
      "shiftName": "Morning Shift",
      "startTime": "08:00:00",
      "endTime": "16:00:00",
      "workDate": "2026-05-22"
    }
  ],
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------------------------------------------------

## API: deleteAssignStaff: DELETE /admin/assign-staff/{assignId}
**Role:** `ADMIN`
Deletes a specific staff assignment record.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `assignId` | Integer | Path Variable | Yes | Assignment record ID to delete |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": "Assignment deleted successfully",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------------------------

# 2. Controller: AdminAttendanceController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: getAttendanceList: GET /admin/attendance
**Role:** `ADMIN`
Retrieves a paginated list of staff attendances, optionally filtered.

### Parameters (Query Parameters)
All filter parameter keys mapping to `AttendanceFilterRequest`:
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | int | No (Default: `0`) | Zero-based page index |
| `size` | int | No (Default: `10`) | Elements per page |
| `sortBy` | String | No | Field to sort by |
| `direction` | String | No | Sort direction (`asc` or `desc`) |
| `workDate` | LocalDate | No | Filter by specific date (`YYYY-MM-DD`) |
| `month` | Integer | No | Filter by month |
| `year` | Integer | No | Filter by year |
| `userId` | Integer | No | Filter by staff user ID |
| `shiftId` | Integer | No | Filter by shift ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "attendanceId": 1,
        "userId": 10,
        "fullName": "Staff Member A",
        "role": "RECEPTIONIST",
        "assignId": 1,
        "shiftName": "Morning Shift",
        "checkIn": "2026-05-22T08:05:00",
        "lateMinutes": 5,
        "status": "LATE",
        "message": "Late checked in"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

---------------------------------------------------------------------------

# 3. Controller: AdminBookingController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: getAllBookings: GET /admin/bookings
**Role:** `ADMIN`
View all bookings in the system with pagination.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | int | No | Page number |
| `size` | int | No | Page size |
| `sortBy` | String | No | Sort column |
| `direction` | String | No | Direction (`asc`/`desc`) |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "customerId": 5,
        "customerName": "Alice Johnson",
        "customerPhone": "0987654321",
        "customerEmail": "alice@gmail.com",
        "roomTypeId": 1,
        "roomTypeName": "Deluxe King Room",
        "requestedQuantity": 1,
        "requestedCheckin": "2026-06-01T14:00:00",
        "requestedCheckout": "2026-06-03T12:00:00",
        "bookingType": "DAILY",
        "bookingSource": "WEB",
        "status": "CONFIRMED",
        "totalAmount": 150.00,
        "paymentStatus": "PAID",
        "createdAt": "2026-05-20T10:15:30"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
---------------------------------------------------------------------------

## API: searchBookings: GET /admin/bookings/search
**Role:** `ADMIN`
Search bookings by text keyword with pagination.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `keyword` | String | No | Keyword to match customer name, email, etc. |
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "customerId": 5,
        "customerName": "Alice Johnson",
        "customerPhone": "0987654321",
        "customerEmail": "alice@gmail.com",
        "roomTypeId": 1,
        "roomTypeName": "Deluxe King Room",
        "requestedQuantity": 1,
        "requestedCheckin": "2026-06-01T14:00:00",
        "requestedCheckout": "2026-06-03T12:00:00",
        "bookingType": "DAILY",
        "bookingSource": "WEB",
        "status": "CONFIRMED",
        "totalAmount": 150.00,
        "paymentStatus": "PAID",
        "createdAt": "2026-05-20T10:15:30"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------------------------------

## API: filterBookings: GET /admin/bookings/filter
**Role:** `ADMIN`
Advanced filtering of bookings by multiple properties.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `status` | String | No | Booking status (`PENDING`/`CONFIRMED`/`COMPLETED`/`CANCELLED`) |
| `paymentStatus` | String | No | Payment status (`PAID`/`UNPAID`/`REFUNDED`) |
| `roomTypeId` | Integer | No | ID of room type booked |
| `fromDate` | LocalDateTime | No | Start checking date limit (Format: `YYYY-MM-DDTHH:MM:SS`) |
| `toDate` | LocalDateTime | No | End checking date limit |
| `bookingSource` | String | No | Booking source (`WEB`/`WALK-IN`/`AGODA`/`BOOKING`/`EXPEDIA`) |
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "customerId": 5,
        "customerName": "Alice Johnson",
        "customerPhone": "0987654321",
        "customerEmail": "alice@gmail.com",
        "roomTypeId": 1,
        "roomTypeName": "Deluxe King Room",
        "requestedQuantity": 1,
        "requestedCheckin": "2026-06-01T14:00:00",
        "requestedCheckout": "2026-06-03T12:00:00",
        "bookingType": "DAILY",
        "bookingSource": "WEB",
        "status": "CONFIRMED",
        "totalAmount": 150.00,
        "paymentStatus": "PAID",
        "createdAt": "2026-05-20T10:15:30"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
------------------------------------------------------------------------------

## API: getAdminBookingDetail: GET /admin/bookings/{bookingId}
**Role:** `ADMIN`
Retrieves full information for a booking, including customers, allocated rooms/schedules, and payment history.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `bookingId` | Integer | Path Variable | Yes | ID of booking to fetch |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "bookingId": 1,
    "bookingType": "DAILY",
    "bookingSource": "WEB",
    "bookingStatus": "CONFIRMED",
    "paymentStatus": "PAID",
    "requestedQuantity": 1,
    "totalAmount": 150.00,
    "notes": "Non-smoking room preferred",
    "requestedCheckin": "2026-06-01T14:00:00",
    "requestedCheckout": "2026-06-03T12:00:00",
    "createdAt": "2026-05-20T10:15:30",
    "customerId": 5,
    "customerName": "Alice Johnson",
    "customerPhone": "0987654321",
    "customerEmail": "alice@gmail.com",
    "customerUsername": "alicej",
    "customerAvatar": "http://cloudinary.com/avatar.jpg",
    "customerGender": "FEMALE",
    "customerDateOfBirth": "1995-04-12",
    "roomTypeId": 1,
    "roomTypeName": "Deluxe King Room",
    "roomTypeDescription": "Luxurious suite with one king-sized bed.",
    "pricePerDay": 75.00,
    "pricePerHour": 10.00,
    "maxAdults": 2,
    "maxChildren": 1,
    "bedCount": 1,
    "bedType": "KING",
    "roomSizeM2": 35.5,
    "roomSchedules": [
      {
        "roomScheduleId": 12,
        "roomId": 101,
        "roomNumber": "101",
        "floor": 1,
        "roomStatus": "ACTIVE",
        "allocatedFor": "CUSTOMER",
        "startAt": "2026-06-01T14:00:00",
        "endAt": "2026-06-03T12:00:00",
        "status": "CONFIRMED",
        "roomKeyId": 45,
        "codeNumber": "K101-ABC",
        "qrCodeData": "qrcode-raw-base64",
        "roomKeyStatus": "ACTIVE",
        "activatedAt": "2026-06-01T14:00:00",
        "expiredAt": "2026-06-03T12:00:00"
      }
    ],
    "payments": [
      {
        "id": 1,
        "amount": 150.00,
        "paymentMethod": "ONLINE",
        "gatewayName": "VNPAY",
        "paymentType": "FULL",
        "status": "PAID",
        "transactionReference": "TX-VNP-12345",
        "paymentDate": "2026-05-20T10:20:00",
        "notes": "Paid online via VnPay"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
----------------------------------------------------------------------------------

## API: cancelBooking: PUT /admin/bookings/{bookingId}/cancel
**Role:** `ADMIN`
Allows an administrator to cancel a booking.

### Request Body (JSON)
```json
{
  "reason": "Customer called to request cancellation due to schedule conflict."
}
```

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `bookingId` | Integer | Path Variable | Yes | Target booking ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Cancel booking success",
  "data": "Cancel booking success",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------------------------------

# 4. Controller: AdminDashBoardController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: getBookingStats: GET /admin/dashboard/room-type-statistic
**Role:** `ADMIN`
Retrieves percentages of room type bookings within a specific month and year.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `year` | Integer | Yes | Year (e.g. 2026) |
| `month` | Integer | No | Month (1-12) |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": [
    {
      "roomTypeId": 1,
      "roomTypeName": "Deluxe King Room",
      "bookingCount": 45,
      "percentage": 60.0
    },
    {
      "roomTypeId": 2,
      "roomTypeName": "Standard Twin Room",
      "bookingCount": 30,
      "percentage": 40.0
    }
  ],
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
---------------------------------------------------------------------

## API: getReviewStatistics: GET /admin/dashboard/review-rate-statistic
**Role:** `ADMIN`
Provides aggregations on star ratings and unreplied reviews.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "totalReviews": 150,
    "averageRating": 4.65,
    "unrepliedReviews": 12,
    "oneStarReviews": 3
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
--------------------------------------------------------------------

## API: getBookingStatistics: GET /admin/dashboard/booking-statistic
**Role:** `ADMIN`
Summary of daily occupancy, total volumes, and web vs. OTA proportions.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "totalBookings": 1240,
    "totalNormalBookings": 840,
    "totalOTABookings": 400,
    "checkedInToday": 24,
    "cancelledBookings": 45,
    "totalRevenue": 245000.50,
    "occupancyRate": 78.5,
    "totalActiveRooms": 50,
    "occupiedRooms": 39
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
--------------------------------------------------------------------------

## API: getOTADashboard: GET /admin/dashboard/ota-statistic
**Role:** `ADMIN`
Summary status of active/inactive integration channels.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "totalChannels": 3,
    "activeChannels": 2,
    "inactiveChannels": 1
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
---------------------------------------------------------------------

## API: getPaymentDashboard: GET /admin/dashboard/payment-statistic
**Role:** `ADMIN`
Financial performance dashboard showing revenue groupings.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "totalRevenue": 245000.50,
    "todayRevenue": 1500.00,
    "monthlyRevenue": 45000.00,
    "totalTransactions": 1420,
    "totalRefund": 5400.00,
    "otaRevenue": 84000.00,
    "occupancyRevenue": 161000.50
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------------

## API: getRevenueStatistics: GET /admin/dashboard/revenue-statistic
**Role:** `ADMIN`
Grouped segments of business revenues.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "dailyRevenue": 1500.00,
    "monthlyRevenue": 45000.00,
    "yearlyRevenue": 540000.00,
    "roomRevenue": 380000.00,
    "otaRevenue": 120000.00,
    "walkInRevenue": 40000.00
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
---------------------------------------------------------------

## API: getStaffDashboard: GET /admin/dashboard/staff-statistic
**Role:** `ADMIN`
Aggregated statistics on active employee attendances.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "totalStaff": 15,
    "totalReceptionist": 6,
    "totalCleaner": 9,
    "totalActiveStaff": 12,
    "totalTodayShifts": 3,
    "totalAbsentToday": 1
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------------

# 5. Controller: AdminHotelController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: getHotelById: GET /admin/hotel
**Role:** `ADMIN`
Retrieves the general hotel information.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 1,
    "name": "Grand Antigravity Resort",
    "description": "Premium luxury resort with smart amenities",
    "starRating": 5.0,
    "address": "123 Galaxy Boulevard, Da Nang",
    "phoneNumber": "02363555999",
    "email": "info@antigravityhotel.com",
    "mapUrl": "https://maps.google.com/...",
    "createdAt": "2026-05-01T00:00:00",
    "updatedAt": "2026-05-20T10:00:00",
    "images": [
      {
        "id": 1,
        "imageUrl": "https://res.cloudinary.com/...",
        "isPrimary": true,
        "caption": "Resort Main Entrance"
      }
    ],
    "amenities": [
      {
        "id": 5,
        "name": "Infinite Pool",
        "description": "Heated water outdoor pool on the rooftop"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------------

## API: updateHotel: PUT /admin/hotel
**Role:** `ADMIN`
Updates basic text properties and contact information of the hotel.

### Request Body (JSON)
```json
{
  "name": "Grand Antigravity Resort & Spa",
  "description": "Ultra luxury resort on the central beach",
  "starRating": 5.0,
  "address": "123 Galaxy Boulevard, Da Nang",
  "phoneNumber": "02363555999",
  "email": "contact@antigravityhotel.com",
  "mapUrl": "https://maps.google.com/..."
}
```

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 1,
    "name": "Grand Antigravity Resort",
    "description": "Premium luxury resort with smart amenities",
    "starRating": 5.0,
    "address": "123 Galaxy Boulevard, Da Nang",
    "phoneNumber": "02363555999",
    "email": "info@antigravityhotel.com",
    "mapUrl": "https://maps.google.com/...",
    "createdAt": "2026-05-01T00:00:00",
    "updatedAt": "2026-05-20T10:00:00",
    "images": [
      {
        "id": 1,
        "imageUrl": "https://res.cloudinary.com/...",
        "isPrimary": true,
        "caption": "Resort Main Entrance"
      }
    ],
    "amenities": [
      {
        "id": 5,
        "name": "Infinite Pool",
        "description": "Heated water outdoor pool on the rooftop"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
--------------------------------------------------------------

## API: uploadHotelImages: POST /admin/hotel/images
**Role:** `ADMIN`
**Consumes:** `multipart/form-data`
Upload a batch of files as hotel images. Returns updated hotel model.

### Request Form Parameters
- `files` (MultipartFile[], Required): Binary file inputs representing photos.

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 1,
    "name": "Grand Antigravity Resort",
    "description": "Premium luxury resort with smart amenities",
    "starRating": 5.0,
    "address": "123 Galaxy Boulevard, Da Nang",
    "phoneNumber": "02363555999",
    "email": "info@antigravityhotel.com",
    "mapUrl": "https://maps.google.com/...",
    "createdAt": "2026-05-01T00:00:00",
    "updatedAt": "2026-05-20T10:00:00",
    "images": [
      {
        "id": 1,
        "imageUrl": "https://res.cloudinary.com/...",
        "isPrimary": true,
        "caption": "Resort Main Entrance"
      }
    ],
    "amenities": [
      {
        "id": 5,
        "name": "Infinite Pool",
        "description": "Heated water outdoor pool on the rooftop"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
---------------------------------------------------------------

## API: updateHotelImage: PUT /admin/hotel/images/{imageId}
**Role:** `ADMIN`
**Consumes:** `multipart/form-data`
Modifies metadata of an uploaded hotel image, or overwrites its binary file.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `imageId` | Integer | Path Variable | Yes | Target image ID to modify |
| `isPrimary` | Boolean | Query Param | No | Set as primary display image |
| `caption` | String | Query Param | No | Update description caption |
| `file` | MultipartFile | Form-Data | No | Optional binary file replacement |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 1,
    "name": "Grand Antigravity Resort",
    "description": "Premium luxury resort with smart amenities",
    "starRating": 5.0,
    "address": "123 Galaxy Boulevard, Da Nang",
    "phoneNumber": "02363555999",
    "email": "info@antigravityhotel.com",
    "mapUrl": "https://maps.google.com/...",
    "createdAt": "2026-05-01T00:00:00",
    "updatedAt": "2026-05-20T10:00:00",
    "images": [
      {
        "id": 1,
        "imageUrl": "https://res.cloudinary.com/...",
        "isPrimary": true,
        "caption": "Resort Main Entrance"
      }
    ],
    "amenities": [
      {
        "id": 5,
        "name": "Infinite Pool",
        "description": "Heated water outdoor pool on the rooftop"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------------

## API: deleteHotelImage: DELETE /admin/hotel/images/{imageId}
**Role:** `ADMIN`
Removes an image asset from the hotel.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `imageId` | Integer | Path Variable | Yes | Image ID to delete |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 1,
    "name": "Grand Antigravity Resort",
    "description": "Premium luxury resort with smart amenities",
    "starRating": 5.0,
    "address": "123 Galaxy Boulevard, Da Nang",
    "phoneNumber": "02363555999",
    "email": "info@antigravityhotel.com",
    "mapUrl": "https://maps.google.com/...",
    "createdAt": "2026-05-01T00:00:00",
    "updatedAt": "2026-05-20T10:00:00",
    "images": [
      {
        "id": 1,
        "imageUrl": "https://res.cloudinary.com/...",
        "isPrimary": true,
        "caption": "Resort Main Entrance"
      }
    ],
    "amenities": [
      {
        "id": 5,
        "name": "Infinite Pool",
        "description": "Heated water outdoor pool on the rooftop"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
------------------------------------------------------

## API: createAmenities: POST /admin/hotel/amenities
**Role:** `ADMIN`
Adds multiple high-level hotel facilities.

### Request Body (JSON)
```json
[
  {
    "name": "Spa & Sauna",
    "description": "Traditional massage therapy and hot saunas"
  },
  {
    "name": "Fitness Gym Center",
    "description": "24/7 modern workout equipment"
  }
]
```

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 1,
    "name": "Grand Antigravity Resort",
    "description": "Premium luxury resort with smart amenities",
    "starRating": 5.0,
    "address": "123 Galaxy Boulevard, Da Nang",
    "phoneNumber": "02363555999",
    "email": "info@antigravityhotel.com",
    "mapUrl": "https://maps.google.com/...",
    "createdAt": "2026-05-01T00:00:00",
    "updatedAt": "2026-05-20T10:00:00",
    "images": [
      {
        "id": 1,
        "imageUrl": "https://res.cloudinary.com/...",
        "isPrimary": true,
        "caption": "Resort Main Entrance"
      }
    ],
    "amenities": [
      {
        "id": 5,
        "name": "Infinite Pool",
        "description": "Heated water outdoor pool on the rooftop"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
---------------------------------------------------------------

## API: updateAmenity: PUT /admin/hotel/amenities/{id}
**Role:** `ADMIN`
Updates the name and details of a specific hotel facility.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `id` | Integer | Path Variable | Yes | Facility amenity ID |
| `name` | String | Query Param | No | Updated name |
| `description` | String | Query Param | No | Updated description |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 1,
    "name": "Grand Antigravity Resort",
    "description": "Premium luxury resort with smart amenities",
    "starRating": 5.0,
    "address": "123 Galaxy Boulevard, Da Nang",
    "phoneNumber": "02363555999",
    "email": "info@antigravityhotel.com",
    "mapUrl": "https://maps.google.com/...",
    "createdAt": "2026-05-01T00:00:00",
    "updatedAt": "2026-05-20T10:00:00",
    "images": [
      {
        "id": 1,
        "imageUrl": "https://res.cloudinary.com/...",
        "isPrimary": true,
        "caption": "Resort Main Entrance"
      }
    ],
    "amenities": [
      {
        "id": 5,
        "name": "Infinite Pool",
        "description": "Heated water outdoor pool on the rooftop"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
----------------------------------------------------------------

## API: deleteAmenity: DELETE /admin/hotel/amenities/{amenityId}
**Role:** `ADMIN`
Deletes a facility/amenity from the hotel.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `amenityId` | Integer | Path Variable | Yes | Amenity ID to delete |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 1,
    "name": "Grand Antigravity Resort",
    "description": "Premium luxury resort with smart amenities",
    "starRating": 5.0,
    "address": "123 Galaxy Boulevard, Da Nang",
    "phoneNumber": "02363555999",
    "email": "info@antigravityhotel.com",
    "mapUrl": "https://maps.google.com/...",
    "createdAt": "2026-05-01T00:00:00",
    "updatedAt": "2026-05-20T10:00:00",
    "images": [
      {
        "id": 1,
        "imageUrl": "https://res.cloudinary.com/...",
        "isPrimary": true,
        "caption": "Resort Main Entrance"
      }
    ],
    "amenities": [
      {
        "id": 5,
        "name": "Infinite Pool",
        "description": "Heated water outdoor pool on the rooftop"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------------

# 6. Controller: AdminInvoiceController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: generateInvoice: POST /admin/invoices
**Role:** `ADMIN`
Generates a formal invoice record for a completed booking payment.

### Request Body (JSON)
```json
{
  "bookingId": 1,
  "paymentId": 1,
  "invoiceDescription": "Full check-out room stay invoice"
}
```

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 100,
    "invoiceNumber": "INV-20260522-0001",
    "customerName": "Alice Johnson",
    "customerEmail": "alice@gmail.com",
    "customerPhone": "0987654321",
    "amountPaid": 150.00,
    "invoiceDescription": "Full check-out room stay invoice",
    "issuedAt": "2026-05-22T07:00:00",
    "isSentEmail": false
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------

## API: viewInvoiceDetail: GET /admin/invoices/{invoiceId}
**Role:** `ADMIN`
Retrieve raw detail fields of an existing invoice.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `invoiceId` | Integer | Path Variable | Yes | Invoice ID |

### Success Response (JSON)
```json
{
  "bookingId": 1,
  "paymentId": 1,
  "invoiceDescription": "Full check-out room stay invoice"
}
```

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 100,
    "invoiceNumber": "INV-20260522-0001",
    "customerName": "Alice Johnson",
    "customerEmail": "alice@gmail.com",
    "customerPhone": "0987654321",
    "amountPaid": 150.00,
    "invoiceDescription": "Full check-out room stay invoice",
    "issuedAt": "2026-05-22T07:00:00",
    "isSentEmail": false
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------------

## API: downloadInvoice: GET /admin/invoices/{invoiceId}/download
**Role:** `ADMIN`
Streams/downloads the official printable invoice in PDF format.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `invoiceId` | Integer | Path Variable | Yes | Invoice ID |

### Success Response
- **Headers:**
  - `Content-Disposition: attachment; filename=invoice.pdf`
  - `Content-Type: application/pdf`
- **Body:** Binary byte stream representing PDF document data.

---------------------------------------------------------------

## API: sendInvoiceEmail: POST /admin/invoices/{invoiceId}/send-email
**Role:** `ADMIN`
Manually triggers email dispatch of the invoice PDF copy to the guest's registered email.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `invoiceId` | Integer | Path Variable | Yes | Target Invoice ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "SEND_INVOICE_EMAIL_SUCCESS",
  "data": "SEND_INVOICE_EMAIL_SUCCESS",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
--------------------------------------------------------------------

# 7. Controller: AdminPaymentController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: viewPaymentList: GET /admin/payments
**Role:** `ADMIN`
Retrieves paginated, filtered transaction logs.

### Parameters (Query Parameters)
Accepts all query fields in `PaymentSearchRequest`:
| Name | Type | Required | Description |
|---|---|---|---|
| `keyword` | String | No | Search by customer name, ref, etc. |
| `status` | String | No | Filter by transaction status (`PENDING`/`PAID`/`FAILED`/`REFUNDED`) |
| `paymentMethod` | String | No | Filter method (`ONLINE`/`CASH`) |
| `bookingSource` | String | No | Filter source (`WEB`/`WALK-IN`/`AGODA`, etc.) |
| `otaChannel` | String | No | Filter channel name |
| `fromDate` | LocalDate | No | Lower limit of transaction date (`YYYY-MM-DD`) |
| `toDate` | LocalDate | No | Upper limit of transaction date |
| `minAmount` | BigDecimal | No | Minimum transaction value |
| `maxAmount` | BigDecimal | No | Maximum transaction value |
| `page` | int | No | Page number |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "amount": 150.00,
        "paymentMethod": "ONLINE",
        "gatewayName": "VNPAY",
        "paymentType": "FULL",
        "status": "PAID",
        "transactionReference": "TX-VNP-12345",
        "paymentDate": "2026-05-20T10:20:00",
        "notes": "Paid online via VnPay"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
---------------------------------------------------------------

## API: viewPaymentDetail: GET /admin/payments/{paymentId}
**Role:** `ADMIN`
Retrieve specific transaction context, including guest and room schedules.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `paymentId` | Integer | Path Variable | Yes | Transaction ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "paymentId": 1,
    "amount": 150.00,
    "paymentMethod": "ONLINE",
    "gatewayName": "VNPAY",
    "paymentType": "FULL",
    "status": "PAID",
    "transactionReference": "TX-VNP-12345",
    "paymentDate": "2026-05-20T10:20:00",
    "notes": "Paid online via VnPay",
    "bookingId": 1,
    "bookingType": "DAILY",
    "bookingSource": "WEB",
    "bookingStatus": "CONFIRMED",
    "paymentStatus": "PAID",
    "totalBookingAmount": 150.00,
    "requestedCheckin": "2026-06-01T14:00:00",
    "requestedCheckout": "2026-06-03T12:00:00",
    "customerId": 5,
    "customerName": "Alice Johnson",
    "customerPhone": "0987654321",
    "customerEmail": "alice@gmail.com",
    "roomTypeName": "Deluxe King Room",
    "requestedQuantity": 1,
    "rooms": [
      {
        "roomId": 101,
        "roomNumber": "101",
        "startAt": "2026-06-01T14:00:00",
        "endAt": "2026-06-03T12:00:00",
        "status": "CONFIRMED"
      }
    ],
    "invoiceId": 100
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
----------------------------------------------------------------------------

## API: updatePaymentStatus: PUT /admin/payments/{paymentId}/status
**Role:** `ADMIN`
Overrides or changes the status of a specific payment (e.g., cash settlement confirmation).

### Request Body (JSON)
```json
{
  "status": "PAID",
  "notes": "Admin manually verified cash handover at front desk"
}
```

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `paymentId` | Integer | Path Variable | Yes | target payment transaction ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "UPDATE_PAYMENT_STATUS_SUCCESS",
  "data": "UPDATE_PAYMENT_STATUS_SUCCESS",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------------

# 8. Controller: AdminReviewController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: getAllReviews: GET /admin/reviews
**Role:** `ADMIN`
View guest reviews with paging, optionally filtering by reply status.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `replyStatus` | String | No | Filter by reply status (`REPLIED`/`UNREPLIED`) |
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 15,
        "rating": 5,
        "comment": "Incredible experience, super clean!",
        "hotelReply": "Thank you for staying with us, Alice!",
        "repliedAt": "2026-05-21T18:00:00",
        "createdAt": "2026-05-20T22:00:00",
        "customer": {
          "id": 5,
          "fullName": "Alice Johnson",
          "email": "alice@gmail.com"
        },
        "roomType": {
          "id": 1,
          "name": "Deluxe King Room",
          "roomSizeM2": 35.5,
          "maxAdults": 2,
          "maxChildren": 1,
          "pricePerDay": 75.00,
          "pricePerHour": 10.00
        }
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------

## API: getReviewDetail: GET /admin/reviews/{reviewId}
**Role:** `ADMIN`
Retrieve exact fields of a specific guest review.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `reviewId` | Integer | Path Variable | Yes | Review ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 15,
        "rating": 5,
        "comment": "Incredible experience, super clean!",
        "hotelReply": "Thank you for staying with us, Alice!",
        "repliedAt": "2026-05-21T18:00:00",
        "createdAt": "2026-05-20T22:00:00",
        "customer": {
          "id": 5,
          "fullName": "Alice Johnson",
          "email": "alice@gmail.com"
        },
        "roomType": {
          "id": 1,
          "name": "Deluxe King Room",
          "roomSizeM2": 35.5,
          "maxAdults": 2,
          "maxChildren": 1,
          "pricePerDay": 75.00,
          "pricePerHour": 10.00
        }
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

-----------------------------------------------------------------------

## API: replyReview
Submit/Update administrative reply message for a guest review.

- **Method:** `PUT`
- **URL:** `/admin/reviews/{reviewId}/reply`
- **Role:** `ADMIN`

### Request Body (JSON)
```json
{
  "replyContent": "Thank you Alice, we hope to serve you again very soon!"
}
```

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `reviewId` | Integer | Path Variable | Yes | Review ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Review reply submitted successfully",
  "data": "Review reply submitted successfully",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
--------------------------------------------------------

## API: deleteReview: DELETE /admin/reviews/{reviewId}
**Role:** `ADMIN`
Removes/Moderates a guest review.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `reviewId` | Integer | Path Variable | Yes | Target Review ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Review deleted successfully",
  "data": "Review deleted successfully",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------------

## API: searchReviews: GET /admin/reviews/search
**Role:** `ADMIN`
Paging and filtering reviews by keywords, star rating, and date limits.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `keyword` | String | No | Substring search within guest comments |
| `rating` | Integer | No | Exact star rating filter (1-5) |
| `fromDate` | LocalDate | No | Start date range filter (`YYYY-MM-DD`) |
| `toDate` | LocalDate | No | End date range filter |
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 15,
        "rating": 5,
        "comment": "Incredible experience, super clean!",
        "hotelReply": "Thank you for staying with us, Alice!",
        "repliedAt": "2026-05-21T18:00:00",
        "createdAt": "2026-05-20T22:00:00",
        "customer": {
          "id": 5,
          "fullName": "Alice Johnson",
          "email": "alice@gmail.com"
        },
        "roomType": {
          "id": 1,
          "name": "Deluxe King Room",
          "roomSizeM2": 35.5,
          "maxAdults": 2,
          "maxChildren": 1,
          "pricePerDay": 75.00,
          "pricePerHour": 10.00
        }
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
----------------------------------------------------

# 9. Controller: AdminRoleSalaryConfigController 
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: getAllRoleSalaryConfigs: GET /admin/role-salary-configs
**Role:** `ADMIN`
Retrieves the standard pay scale configurations per shift for cleaning and receptionist roles.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `isActive` | Boolean | No | Filter by active configurations |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": [
    {
      "id": 1,
      "staffRole": "CLEANER",
      "baseSalary": 20.00,
      "isActive": true,
      "createdAt": "2026-05-01T08:00:00",
      "updatedAt": "2026-05-20T12:00:00"
    },
    {
      "id": 2,
      "staffRole": "RECEPTIONIST",
      "baseSalary": 25.00,
      "isActive": true,
      "createdAt": "2026-05-01T08:00:00",
      "updatedAt": "2026-05-20T12:00:00"
    }
  ],
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
--------------------------------------------------------

## API: updateRoleSalaryConfig: PUT /admin/role-salary-configs/{id}
**Role:** `ADMIN`
Modify the payment tier per shift for an employee category.

### Request Body (JSON)
```json
{
  "baseSalary": 22.50,
  "isActive": true
}
```
*Constraints:*
- `baseSalary`: `@NotNull(message = "BASE_SALARY_REQUIRED")`, `@DecimalMin(value = "0", message = "BASE_SALARY_INVALID")`
- `isActive`: `@NotNull(message = "IS_ACTIVE_REQUIRED")`

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `id` | Integer | Path Variable | Yes | Salary Configuration ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "id": 1,
    "staffRole": "CLEANER",
    "baseSalary": 22.50,
    "isActive": true,
    "createdAt": "2026-05-01T08:00:00",
    "updatedAt": "2026-05-22T07:00:00"
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
--------------------------------------------------------

# 10. Controller: AdminRoomController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: createRoom: POST /admin/rooms
**Role:** `ADMIN`
Creates a physical hotel room mapping.

### Request Body (JSON)
```json
{
  "roomTypeId": 1,
  "roomNumber": "105",
  "floor": 1,
  "allocatedFor": "CUSTOMER"
}
```
*Constraints:*
- `roomTypeId`: `@NotNull(message = "Room type ID cannot be null")`
- `roomNumber`: `@NotBlank(message = "Room number cannot be blank")`
- `floor`: `@NotNull(message = "Floor cannot be null")`, `@Min(value = 0, message = "Floor must be at least 0")`
- `allocatedFor`: `@NotBlank(message = "Allocated for cannot be blank")`

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Room created successfully",
  "data": {
    "id": 8,
    "roomNumber": "105",
    "floor": 1,
    "allocatedFor": "CUSTOMER",
    "status": "READY",
    "isActive": true,
    "roomTypeId": 1,
    "roomTypeName": "Deluxe King Room"
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
----------------------------------------------------------

## API: updateRoom: PUT /admin/rooms/{roomId}
**Role:** `ADMIN`
Updates properties or the current status (e.g. MAINTENANCE) of a room.

### Request Body (JSON)
```json
{
  "roomTypeId": 1,
  "roomNumber": "105",
  "floor": 1,
  "allocatedFor": "CUSTOMER",
  "status": "DIRTY",
  "isActive": true
}
```
*Constraints:*
- `roomTypeId`: `@NotNull(message = "Room type ID cannot be null")`
- `roomNumber`: `@NotBlank(message = "Room number cannot be blank")`
- `floor`: `@NotNull(message = "Floor cannot be null")`, `@Min(value = 0, message = "Floor must be at least 0")`
- `allocatedFor`: `@NotBlank(message = "Allocated for cannot be blank")`
- `status`: `@NotBlank(message = "Status cannot be blank")`
- `isActive`: `@NotNull(message = "Active status cannot be null")`

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomId` | Integer | Path Variable | Yes | ID of room to update |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Room created successfully",
  "data": {
    "id": 8,
    "roomNumber": "105",
    "floor": 1,
    "allocatedFor": "CUSTOMER",
    "status": "DIRTY",
    "isActive": true,
    "roomTypeId": 1,
    "roomTypeName": "Deluxe King Room"
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------------

## API: deleteRoom: DELETE /admin/rooms/{roomId}
**Role:** `ADMIN`
Removes a room from the system.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomId` | Integer | Path Variable | Yes | Room ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Room deleted successfully",
  "data": "Room deleted successfully",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------

## API: getAllRooms: GET /admin/rooms
**Role:** `ADMIN`
View a paginated, filterable listing of all hotel rooms.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `roomTypeId` | Integer | No | Filter by specific room type ID |
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "roomNumber": "101",
        "floor": 1,
        "allocatedFor": "CUSTOMER",
        "status": "READY",
        "isActive": true,
        "roomTypeId": 1,
        "roomTypeName": "Deluxe King Room"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
------------------------------------------------------

## API: getRoomDetail: GET /admin/rooms/{roomId}
**Role:** `ADMIN`
Retrieve fields of a single room.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomId` | Integer | Path Variable | Yes | Target Room ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Room created successfully",
  "data": {
    "id": 8,
    "roomNumber": "105",
    "floor": 1,
    "allocatedFor": "CUSTOMER",
    "status": "DIRTY",
    "isActive": true,
    "roomTypeId": 1,
    "roomTypeName": "Deluxe King Room"
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------

# 11. Controller: AdminRoomTypeController 
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: getAllRoomTypes: GET /admin/room-types
**Role:** `ADMIN`
Views all registered room type categories.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `status` | Integer | No | Filter status (`1` Active, `0` Inactive) |
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "hotelId": 1,
        "name": "Deluxe King Room",
        "description": "Luxurious suite with one king-sized bed.",
        "status": 1,
        "pricePerDay": 75.00,
        "pricePerHour": 10.00,
        "targetDailyPercentage": 70,
        "targetHourlyPercentage": 30,
        "maxAdults": 2,
        "maxChildren": 1,
        "bedCount": 1,
        "bedType": "KING",
        "roomSizeM2": 35.5,
        "createdAt": "2026-05-01T10:00:00",
        "updatedAt": "2026-05-20T10:00:00"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
----------------------------------------------------------

## API: getRoomTypeDetail: GET /admin/room-types/{roomTypeId}
**Role:** `ADMIN`
Retrieves detail info on a specific category.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomTypeId` | Integer | Path Variable | Yes | Target Room Type ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "hotelId": 1,
        "name": "Deluxe King Room",
        "description": "Luxurious suite with one king-sized bed.",
        "status": 1,
        "pricePerDay": 75.00,
        "pricePerHour": 10.00,
        "targetDailyPercentage": 70,
        "targetHourlyPercentage": 30,
        "maxAdults": 2,
        "maxChildren": 1,
        "bedCount": 1,
        "bedType": "KING",
        "roomSizeM2": 35.5,
        "createdAt": "2026-05-01T10:00:00",
        "updatedAt": "2026-05-20T10:00:00"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
------------------------------------------------------

## API: createRoomType: POST /admin/room-types
**Role:** `ADMIN`
Create a new category of room type.

### Request Body (JSON)
```json
{
  "name": "Super Executive Suite",
  "description": "Premium top floor suite with private jacuzzi",
  "status": 1,
  "pricePerDay": 150.00,
  "pricePerHour": 25.00,
  "targetDailyPercentage": 80,
  "targetHourlyPercentage": 20,
  "maxAdults": 4,
  "maxChildren": 2,
  "bedCount": 2,
  "bedType": "QUEEN",
  "roomSizeM2": 65.0
}
```

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Room type created successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------

## API: updateRoomType: PUT /admin/room-types/{roomTypeId} 
**Role:** `ADMIN`
Updates properties of an existing category.

### Request Body (JSON)
```json
{
  "name": "Super Executive Suite",
  "description": "Premium top floor suite with private jacuzzi and ocean view",
  "status": 1,
  "pricePerDay": 155.00,
  "pricePerHour": 25.00,
  "targetDailyPercentage": 80,
  "targetHourlyPercentage": 20,
  "maxAdults": 4,
  "maxChildren": 2,
  "bedCount": 2,
  "bedType": "QUEEN",
  "roomSizeM2": 65.0
}
```
*Constraints:*
- `name`: `@NotBlank`, `@Size(max = 100)`
- `status`: `@Min(0)`, `@Max(1)`
- `pricePerDay`: `@NotNull`, `@DecimalMin(value = "0.0")`
- `pricePerHour`: `@NotNull`, `@DecimalMin(value = "0.0")`
- `targetDailyPercentage`: `@Min(0)`, `@Max(100)`
- `targetHourlyPercentage`: `@Min(0)`, `@Max(100)`
- `maxAdults`: `@Min(1)`
- `maxChildren`: `@Min(0)`
- `bedCount`: `@Min(1)`
- `roomSizeM2`: `@Positive`

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomTypeId` | Integer | Path Variable | Yes | Room Type ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Room type updated successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
----------------------------------------------------

## API: deleteRoomType: DELETE /admin/room-types/{roomTypeId}
**Role:** `ADMIN`
Deletes a room type category from the hotel.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomTypeId` | Integer | Path Variable | Yes | Room Type ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Room type deleted successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------

## API: getImages: GET /admin/room-types/{roomTypeId}/images
**Role:** `ADMIN`
Retrieves a list of images assigned to a room type.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomTypeId` | Integer | Path Variable | Yes | Room Type ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": [
    {
      "id": 10,
      "imageUrl": "https://res.cloudinary.com/...",
      "isPrimary": true,
      "caption": "Living Area View"
    }
  ],
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
----------------------------------------------------------

## API: uploadImages: POST /admin/room-types/{roomTypeId}/images
**Role:** `ADMIN`
**Consumes:** `multipart/form-data`
Batch uploads files for a room type.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomTypeId` | Integer | Path Variable | Yes | Target Room Type ID |
| `files` | List<MultipartFile> | Form-Data Parameter | Yes | Binary images array |

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Images uploaded successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
------------------------------------------------

## API: updateImage: PUT /admin/room-types/{roomTypeId}/images/{imageId}
**Role:** `ADMIN`
Updates the display priority or caption string of a room type photo.

### Request Body (JSON)
```json
{
  "isPrimary": true,
  "caption": "Overlooking rooftop terrace view"
}
```

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomTypeId` | Integer | Path Variable | Yes | Room Type ID |
| `imageId` | Integer | Path Variable | Yes | Target Image ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Image updated successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
------------------------------------------------------

## API: deleteImage: DELETE /admin/room-types/{roomTypeId}/images/{imageId}
**Role:** `ADMIN`
Removes an image asset from a room type.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomTypeId` | Integer | Path Variable | Yes | Room Type ID |
| `imageId` | Integer | Path Variable | Yes | Image ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Image deleted successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------------

## API: getItemsByRoomType: GET /admin/room-types/{roomTypeId}/items
**Role:** `ADMIN`
Get list of physical items/amenities currently assigned to a room type.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomTypeId` | Integer | Path Variable | Yes | Room Type ID |
| `page` | int | Query Param | No | Page index |
| `size` | int | Query Param | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "itemId": 30,
        "itemName": "Mini Refrigerator",
        "itemImageUrl": "https://cloudinary.com/fridge.jpg",
        "baseUnitPrice": 120.00,
        "quantity": 1
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------------

## API: addItemsToRoomType: POST /admin/room-types/{roomTypeId}/items
**Role:** `ADMIN`
Links an array of base items with their required quantities to a room type.

### Request Body (JSON)
```json
[
  {
    "itemId": 30,
    "quantity": 1
  },
  {
    "itemId": 32,
    "quantity": 4
  }
]
```

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomTypeId` | Integer | Path Variable | Yes | Room Type ID |

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Items added successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------

## API: removeItemFromRoomType: DELETE /admin/room-types/{roomTypeId}/items/{itemId}
**Role:** `ADMIN`
Removes a physical item allocation link from a room type.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `roomTypeId` | Integer | Path Variable | Yes | Room Type ID |
| `itemId` | Integer | Path Variable | Yes | Base Item ID to unlink |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Item removed from room type successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
----------------------------------------------------------

## API: createBaseItemList: POST /admin/room-types/base-items
**Role:** `ADMIN`
Creates standalone physical items/amenities in the main inventory catalogue.

### Request Body (JSON)
```json
[
  {
    "itemName": "Smart TV 55 Inch",
    "baseUnitPrice": 450.00,
    "description": "Samsung 4K UHD Smart Television"
  }
]
```

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Base items created successfully",
  "data": [
    {
      "id": 50,
      "itemName": "Smart TV 55 Inch",
      "baseUnitPrice": 450.00,
      "itemImageUrl": null,
      "description": "Samsung 4K UHD Smart Television"
    }
  ],
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------

## API: uploadBaseItemImage: POST /admin/room-types/base-items/{baseItemId}/image
**Role:** `ADMIN`
**Consumes:** `multipart/form-data`
Upload or overwrite image representing a standalone item.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `baseItemId` | Integer | Path Variable | Yes | Main Inventory Base Item ID |
| `file` | MultipartFile | Form-Data (Part) | Yes | Image file representing the item |

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Base item image uploaded successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------

## API: deleteBaseItem: DELETE /admin/room-types/base-items/{baseItemId}
**Role:** `ADMIN`
Deletes a physical item catalog completely from inventory.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `baseItemId` | Integer | Path Variable | Yes | Base Item ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Base item deleted successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------------

## API: updateBaseItem: PUT /admin/room-types/base-items/{baseItemId}
**Role:** `ADMIN`
Modifies standalone item properties.

### Request Body (JSON)
```json
{
  "itemName": "Smart TV 55 Inch Pro",
  "baseUnitPrice": 480.00,
  "description": "Samsung 4K UHD Smart Television Pro Series"
}
```

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `baseItemId` | Integer | Path Variable | Yes | Base Item ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Base item updated successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
------------------------------------------------------------

## API: getAllBaseItems: GET /admin/room-types/base-items
**Role:** `ADMIN`
Lists all base item templates registered in the inventory.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 50,
        "itemName": "Smart TV 55 Inch Pro",
        "baseUnitPrice": 480.00,
        "itemImageUrl": "https://cloudinary.com/tv.jpg",
        "description": "Samsung 4K UHD Smart Television Pro Series"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------

# 12. Controller: AdminSalaryController 
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: calculateSalaryForAll: POST /admin/salary/calculate-all
**Role:** `ADMIN`
Calculates attendance-based salary summaries for all staff for a specific month/year.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `month` | Integer | Yes | Month index (e.g. 5) |
| `year` | Integer | Yes | Year value (e.g. 2026) |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": [
    {
      "salarySheetId": 12,
      "userId": 10,
      "fullName": "Staff Member A",
      "role": "RECEPTIONIST",
      "month": 5,
      "year": 2026,
      "attendanceCount": 22,
      "salaryPerShift": 25.00,
      "totalSalary": 550.00,
      "status": "UNPAID",
      "createAt": "2026-05-22T07:00:00",
      "updatedAt": "2026-05-22T07:00:00"
    }
  ],
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------

## API: getSalarySheets: GET /admin/salary
**Role:** `ADMIN`
Retrieve paginated, filterable salary sheets.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `month` | Integer | No | Month |
| `year` | Integer | No | Year |
| `userId` | Integer | No | Filter by User ID |
| `role` | String | No | Filter by role category (`CLEANER`/`RECEPTIONIST`) |
| `status` | String | No | Filter status (`PAID`/`UNPAID`) |
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "salarySheetId": 12,
        "userId": 10,
        "fullName": "Staff Member A",
        "role": "RECEPTIONIST",
        "month": 5,
        "year": 2026,
        "attendanceCount": 22,
        "salaryPerShift": 25.00,
        "totalSalary": 550.00,
        "status": "UNPAID",
        "createAt": "2026-05-22T07:00:00",
        "updatedAt": "2026-05-22T07:00:00"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
----------------------------------------------

## API: updateSalaryStatusPaid: PUT /admin/salary/{salarySheetId}/paid
**Role:** `ADMIN`
Confirm and tag an employee's salary sheet record status as `PAID`.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `salarySheetId` | Integer | Path Variable | Yes | Target Salary Sheet Record ID |

### Success Response (JSON)
{
  "success": true,
  "message": "Successfully",
  "data": [
    {
      "salarySheetId": 12,
      "userId": 10,
      "fullName": "Staff Member A",
      "role": "RECEPTIONIST",
      "month": 5,
      "year": 2026,
      "attendanceCount": 22,
      "salaryPerShift": 25.00,
      "totalSalary": 550.00,
      "status": "PAID",
      "createAt": "2026-05-22T07:00:00",
      "updatedAt": "2026-05-22T07:00:00"
    }
  ],
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

----------------------------------------------------

# 13. Controller: AdminShiftController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: createShift: POST /admin/shifts
**Role:** `ADMIN`
Defines a standard operating work shift template. 

### Request Body (JSON)
```json
{
  "shiftName": "Night Shift",
  "startTime": "22:00:00",
  "endTime": "06:00:00",
  "description": "Overnight staff shift"
}
```
*Constraints:*
- `shiftName`: `@NotBlank(message = "SHIFT_NAME_REQUIRED")`
- `startTime`: `@NotNull(message = "START_TIME_REQUIRED")` (Format: `HH:mm:ss`)
- `endTime`: `@NotNull(message = "END_TIME_REQUIRED")`

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Shift created successfully",
  "data": {
    "id": 3,
    "shiftName": "Night Shift",
    "startTime": "22:00:00",
    "endTime": "06:00:00",
    "description": "Overnight staff shift",
    "isActive": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------

## API: updateShift: PUT /admin/shifts/{shiftId}
**Role:** `ADMIN`
Update details or toggle the active status of a work shift.

### Request Body (JSON)
```json
{
  "shiftName": "Night Shift Pro",
  "startTime": "22:00:00",
  "endTime": "06:00:00",
  "description": "Overnight staff shift extended",
  "isActive": true
}
```
*Constraints:*
- `shiftName`: `@NotBlank(message = "SHIFT_NAME_REQUIRED")`
- `startTime`: `@NotNull(message = "START_TIME_REQUIRED")`
- `endTime`: `@NotNull(message = "END_TIME_REQUIRED")`
- `isActive`: `@NotNull(message = "IS_ACTIVE_REQUIRED")`

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `shiftId` | Integer | Path Variable | Yes | Shift Template ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Shift created successfully",
  "data": {
    "id": 3,
    "shiftName": "Night Shift",
    "startTime": "22:00:00",
    "endTime": "06:00:00",
    "description": "Overnight staff shift",
    "isActive": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
--------------------------------------------------

## API: getAllShifts: GET /admin/shifts
**Role:** `ADMIN`
Lists all registered shift templates.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `isActive` | Boolean | No | Filter by active state |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": [
    {
      "id": 1,
      "shiftName": "Morning Shift",
      "startTime": "08:00:00",
      "endTime": "16:00:00",
      "description": "Regular morning shift",
      "isActive": true
    }
  ],
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------

# 14. Controller: AdminStaffController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: register: POST /admin/staff
**Role:** `ADMIN`
Administratively creates a new staff account (Receptionist or Cleaner).

### Request Body (JSON)
```json
{
  "username": "cleaner_bob",
  "email": "bob@hotel.com",
  "password": "SecurePassword123",
  "fullName": "Bob Builder",
  "phone": "0987111222",
  "gender": "MALE",
  "role": "CLEANER",
  "dateOfBirth": "1990-12-05"
}
```

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Staff account created successfully",
  "data": "Staff account created successfully",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
------------------------------------------------

## API: updateProfileByAdmin: PUT /admin/staff/{staffId}
**Role:** `ADMIN`
Updates standard profile fields and status toggles for any employee.

### Request Body (JSON)
```json
{
  "email": "bob.builder@hotel.com",
  "fullName": "Bob The Builder",
  "password": "OptionalNewPassword",
  "phone": "0987111333",
  "gender": "MALE",
  "dateOfBirth": "1990-12-05",
  "role": "CLEANER",
  "status": 1
}
```

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `staffId` | Integer | Path Variable | Yes | Target Employee's User ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Staff profile updated successfully",
  "data": {
    "id": 10,
    "username": "cleaner_bob",
    "email": "bob.builder@hotel.com",
    "emailVerified": true,
    "fullName": "Bob The Builder",
    "phone": "0987111333",
    "avatarUrl": "https://cloudinary.com/...",
    "gender": "MALE",
    "dateOfBirth": "1990-12-05",
    "role": "CLEANER",
    "status": 1
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
---------------------------------------------

## API: getStaffs: GET /admin/staff
**Role:** `ADMIN`
Query paginated list of all active/inactive employee accounts.

### Parameters (Query Parameters)
Accepts all query options in `AdminStaffListRequest`:
| Name | Type | Required | Description |
|---|---|---|---|
| `keyword` | String | No | Search string matching email/fullname |
| `role` | String | No | Filter by role Category (`CLEANER`/`RECEPTIONIST`) |
| `status` | Integer | No | Filter by state code (`1` Active, `2` Inactive, `3` Banned) |
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 10,
        "username": "cleaner_bob",
        "email": "bob.builder@hotel.com",
        "emailVerified": true,
        "fullName": "Bob The Builder",
        "phone": "0987111333",
        "avatarUrl": "https://cloudinary.com/...",
        "gender": "MALE",
        "dateOfBirth": "1990-12-05",
        "role": "CLEANER",
        "status": 1
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
----------------------------------------------

## API: getStaffDetail: GET /admin/staff/{staffId}
**Role:** `ADMIN`
Retrieve exact profile details of an employee.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `staffId` | Integer | Path Variable | Yes | Target Employee's User ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Staff profile updated successfully",
  "data": {
    "id": 10,
    "username": "cleaner_bob",
    "email": "bob.builder@hotel.com",
    "emailVerified": true,
    "fullName": "Bob The Builder",
    "phone": "0987111333",
    "avatarUrl": "https://cloudinary.com/...",
    "gender": "MALE",
    "dateOfBirth": "1990-12-05",
    "role": "CLEANER",
    "status": 1
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

--------------------------------------------------------

# 15. Controller: AuthController 
**Security:** Entirely Public (`.permitAll()`).

## API: register: POST /auth/register
**Role:** Public
Registers a customer account.

### Request Body (JSON)
```json
{
  "username": "johndoe",
  "email": "john.doe@example.com",
  "password": "Password123",
  "fullName": "John Doe",
  "phone": "0912345678",
  "gender": "MALE",
  "dateOfBirth": "1995-08-25"
}
```
*Constraints:*
- `username`: `@NotBlank(message = "Username cannot be blank")`
- `email`: `@NotBlank(message = "Email cannot be blank")`, `@Email(message = "Invalid email format")`
- `password`: `@NotBlank(message = "Password cannot be blank")`, `@Size(min = 6, message = "Password must be at least 6 characters")`
- `fullName`: `@NotBlank(message = "Full name cannot be blank")`
- `phone`: `@NotBlank(message = "Phone number cannot be blank")`
- `gender`: `@NotBlank(message = "Gender cannot be blank")`
- `dateOfBirth`: `@NotNull(message = "Date of birth cannot be null")`

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Registration successful",
  "data": "Register successful. Please verify email.",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
------------------------------------------------

## API: login: POST /auth/login
**Role:** Public
Performs standard username/password authentication. Returns JWT keys.

### Request Body (JSON)
```json
{
  "username": "johndoe",
  "password": "Password123"
}
```
*Constraints:*
- `username`: `@NotBlank(message = "Username cannot be blank")`
- `password`: `@NotBlank(message = "Password cannot be blank")`

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsIn...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR...",
    "user": {
      "id": 15,
      "username": "johndoe",
      "email": "john.doe@example.com",
      "emailVerified": true,
      "fullName": "John Doe",
      "phone": "0912345678",
      "avatarUrl": "https://res.cloudinary.com/...",
      "gender": "MALE",
      "dateOfBirth": "1995-08-25",
      "role": "CUSTOMER",
      "status": 1
    }
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------

## API: loginWithGoogle: POST /auth/google
**Role:** Public
Performs federated SSO login by providing Google's raw authentication identity token.

### Request Body (JSON)
```json
{
  "idToken": "ya29.a0ARrdaM8..."
}
```

### Success Response (JSON)
Returns same payload containing JWT credentials as the standard `login` success response.

--------------------------------------------------------

## API: forgotPassword: POST /auth/forgot-password
**Role:** Public
Requests an OTP reset verification code to be dispatched to a registered email.

### Request Body (JSON)
```json
{
  "email": "john.doe@example.com"
}
```

### Success Response (JSON)
```json
{
  "success": true,
  "message": "OTP has been sent to your email",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
--------------------------------------------------------

## API: resetPassword: POST /auth/reset-password
**Role:** Public
Submit OTP verification code along with new password choice to reset account credentials.

### Request Body (JSON)
```json
{
  "email": "john.doe@example.com",
  "otp": "123456",
  "newPassword": "MyNewPassword123",
  "confirmPassword": "MyNewPassword123"
}
```

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Password reset successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------

## API: logout: POST /auth/logout
**Role:** Public (Authorization Header input required)
Blacklists the current Bearer Token to revoke session authorization.

### Request Headers
- `Authorization: Bearer <Access_Token>` (Required)

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
---------------------------------------------------

# 16. Controller: CleanerRoomController
**Security:** Requires `ROLE_CLEANER` or `ROLE_ADMIN` (JWT Required).

## API: getRoomsNeedCleaning: GET /cleaner/rooms/need-cleaning
**Role:** `CLEANER` or `ADMIN`
Retrieve a paginated listing of rooms marked `DIRTY` that require immediate cleaning.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "bookingId": 23,
        "roomId": 102,
        "roomNumber": "102",
        "roomTypeName": "Standard Twin Room",
        "customerName": "Bob Ross",
        "customerPhone": "0987111333",
        "checkin": "2026-05-21T14:00:00",
        "checkout": "2026-05-22T12:00:00",
        "roomStatus": "DIRTY",
        "scheduleStatus": "CHECKED_OUT"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
--------------------------------------------------------

## API: completeCleaning: POST /cleaner/rooms/complete
**Role:** `CLEANER` or `ADMIN`
Cleaner posts confirmation indicating cleaning tasks are finished for a specific room booking link.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `bookingId` | Integer | Yes | Booking ID associated with the room |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": "Room cleaned successfully and updated status to READY",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

---------------------------------------------

# 17. Controller: CustomerController  
**Security:** Requires `ROLE_CUSTOMER` or `ROLE_ADMIN` (JWT Required).

## API: getMyProfile: GET /customer/me
**Role:** `CUSTOMER` or `ADMIN`
Retrieves the logged-in customer's own detailed profile metrics. 

### Success Response (JSON)
{
    "success": true,
    "message": "Successfully",
    "data": {
        "id": 1,
        "username": "admin_user",
        "email": "admin@example.com",
        "emailVerified": true,
        "fullName": "Admin User",
        "phone": "0901000001",
        "avatarUrl": "https://example.com/avatar/admin.png",
        "gender": "MALE",
        "dateOfBirth": "1995-01-01",
        "role": "ADMIN",
        "status": 1
    },
    "errors": null,
    "timestamp": "2026-05-22T10:02:32"
}

--------------------------------------------

## API: updateProfile
Modifies customer profile demographic values.

- **Method:** `PUT`
- **URL:** `/customer/me`
- **Role:** `CUSTOMER` or `ADMIN`

### Request Body (JSON)
```json
{
  "email": "john.doe.new@example.com",
  "fullName": "John Doe II",
  "phone": "0912999888",
  "gender": "MALE",
  "dateOfBirth": "1995-08-25"
}
```

### Success Response (JSON)
{
    "success": true,
    "message": "Successfully",
    "data": {
        "id": 1,
        "username": "admin_user",
        "email": "admin@example.com",
        "emailVerified": true,
        "fullName": "Admin User",
        "phone": "0901000001",
        "avatarUrl": "https://example.com/avatar/admin.png",
        "gender": "MALE",
        "dateOfBirth": "1995-01-01",
        "role": "ADMIN",
        "status": 1
    },
    "errors": null,
    "timestamp": "2026-05-22T10:02:32"
}

-------------------------------------------------------

## API: updateAvatar: PUT /customer/me/avatar
**Consumes:** `multipart/form-data`
**Role:** `CUSTOMER` or `ADMIN`
Upload new binary image file to serve as avatar.

### Form-Data Parameters
- `file` (MultipartFile, Required): Binary picture input file.

### Success Response (JSON)
{
    "success": true,
    "message": "Avatar updated successfully",
    "data": {
        "id": 1,
        "username": "admin_user",
        "email": "admin@example.com",
        "emailVerified": true,
        "fullName": "Admin User",
        "phone": "0901000001",
        "avatarUrl": "http://res.cloudinary.com/do8uakd0l/image/upload/v1779419015/avatars/i4y4cy5gfwugbwwrie8r.jpg",
        "gender": "MALE",
        "dateOfBirth": "1995-01-01",
        "role": "ADMIN",
        "status": 1
    },
    "errors": null,
    "timestamp": "2026-05-22T10:03:25"
}

-----------------------------------------------------------

## API: changePassword: PUT /customer/me/change-password
**Role:** `CUSTOMER` or `ADMIN`
Changes the user's password.

### Request Body (JSON)
```json
{
  "oldPassword": "SecurePassword123",
  "newPassword": "BrandNewPassword123",
  "confirmPassword": "BrandNewPassword123"
}
```

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": "Password changed successfully",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
------------------------------------------------------

## API: createBooking: POST /customer/bookings
**Role:** `CUSTOMER` or `ADMIN`
Book room(s) online. Resolves customer details from the logged-in context and verifies profile completion.

### Request Body (JSON)
```json
{
  "availabilityRequest": {
    "roomTypeId": 1,
    "checkIn": "2026-06-01T14:00:00",
    "checkOut": "2026-06-03T12:00:00",
    "numberOfRoom": 1,
    "bookingType": "DAILY"
  },
  "bookingSource": "WEB",
  "notes": "Late check-in requested"
}
```
*Constraints inside `availabilityRequest`:*
- `roomTypeId`: `@NotNull(message = "Room type ID cannot be null")`
- `checkIn`: `@NotNull(message = "Check-in time cannot be null")`
- `checkOut`: `@NotNull(message = "Check-out time cannot be null")`
- `numberOfRoom`: `@NotNull(message = "Number of rooms cannot be null")`, `@Min(value = 1, message = "Number of rooms must be at least 1")`
- `bookingType`: `@NotBlank(message = "Booking type cannot be blank")` (Must be: `DAILY` or `HOURLY`)

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "bookingId": 120,
    "status": "PENDING",
    "message": "Please pay to confirm booking"
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------

## API: getBookingHistory: GET /customer/bookings
**Role:** `CUSTOMER` or `ADMIN`
Retrieves the paginated list of bookings owned by the authenticated user, optionally filtered by status.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `status` | String | No | Filter status (`PENDING`/`CONFIRMED`/`COMPLETED`/`CANCELLED`) |
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "bookingId": 120,
        "roomTypeName": "Deluxe King Room",
        "quantity": 1,
        "checkIn": "2026-06-01T14:00:00",
        "checkOut": "2026-06-03T12:00:00",
        "bookingType": "DAILY",
        "status": "PENDING",
        "totalAmount": 150.00,
        "createdAt": "2026-05-22T07:00:00"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

--------------------------------------------------

## API: getBookingDetail: GET /customer/bookings/{bookingId}
**Role:** `CUSTOMER` or `ADMIN`
Retrieves detail info of a personal booking.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `bookingId` | Integer | Path Variable | Yes | Booking ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "bookingId": 120,
    "bookingType": "DAILY",
    "bookingSource": "WEB",
    "bookingStatus": "CONFIRMED",
    "totalAmount": 150.00,
    "paymentStatus": "PAID",
    "notes": "Late check-in requested",
    "createdAt": "2026-05-22T07:00:00",
    "customerId": 15,
    "customerName": "John Doe",
    "customerPhone": "0912345678",
    "customerEmail": "john.doe@example.com",
    "roomTypeId": 1,
    "roomTypeName": "Deluxe King Room",
    "pricePerDay": 75.00,
    "pricePerHour": 10.00,
    "requestedQuantity": 1,
    "requestedCheckin": "2026-06-01T14:00:00",
    "requestedCheckout": "2026-06-03T12:00:00",
    "roomSchedules": [
      {
        "roomScheduleId": 25,
        "roomId": 101,
        "roomNumber": "101",
        "floor": 1,
        "roomStatus": "ACTIVE",
        "startAt": "2026-06-01T14:00:00",
        "endAt": "2026-06-03T12:00:00",
        "scheduleStatus": "CONFIRMED",
        "roomKeyId": 52,
        "codeNumber": "K101-XYZ",
        "qrCodeData": "qrcode-raw-base64",
        "activatedAt": "2026-06-01T14:00:00",
        "expiredAt": "2026-06-03T12:00:00",
        "roomKeyStatus": "ACTIVE"
      }
    ],
    "payments": [
      {
        "id": 15,
        "amount": 150.00,
        "paymentMethod": "ONLINE",
        "gatewayName": "VNPAY",
        "paymentType": "FULL",
        "status": "PAID",
        "transactionReference": "TX-VNP-9999",
        "paymentDate": "2026-05-22T07:05:00",
        "notes": "Paid online via VnPay"
      }
    ],
    "invoices": [
      {
        "id": 105,
        "invoiceNumber": "INV-20260522-0099",
        "customerName": "John Doe",
        "customerEmail": "john.doe@example.com",
        "customerPhone": "0912345678",
        "amountPaid": 150.00,
        "invoiceDescription": "Full check-out room stay invoice",
        "issuedAt": "2026-05-22T07:06:00",
        "isSentEmail": true
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-------------------------------------------------------

## API: cancelBooking: PUT /customer/bookings/{bookingId}/cancel
**Role:** `CUSTOMER` or `ADMIN`
Allows a customer to cancel their booking (refund policies depend on backend logic).

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `bookingId` | Integer | Path Variable | Yes | Target Booking ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
---------------------------------------------------------

## API: refundBooking: PUT /customer/bookings/{bookingId}/refund 
**Role:** `CUSTOMER` or `ADMIN`
Submits a formal request for a refund if eligible.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `bookingId` | Integer | Path Variable | Yes | Target Booking ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Refund request submitted successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------

## API: payment: POST /customer/bookings/payment/vnpay
**Role:** `CUSTOMER` or `ADMIN`
Generates VnPay payment URL gateways to pay for booking balances online.

### Request Body (JSON)
```json
{
  "bookingId": 120,
  "notes": "Paying via VnPay on Chrome Mobile"
}
```

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Payment URL created successfully",
  "data": {
    "paymentUrl": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=150000..."
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
-----------------------------------------------------------

## API: vnpayReturn: GET /customer/bookings/payment/vnpay-return
**Role:** `CUSTOMER` or `ADMIN`
VNPay transaction return callback (Redirect/Query API).

### Parameters (Query Parameters)
*Accepts dynamic VNPay transaction parameters (`vnp_ResponseCode`, `vnp_TxnRef`, etc.)*

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Payment processed successfully",
  "data": {
    "message": "Payment success"
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
------------------------------------------------------

## API: createReview: POST /customer/reviews
**Role:** `CUSTOMER` or `ADMIN`
Creates a review for a booking.

### Request Body (JSON)
```json
{
  "bookingId": 120,
  "rating": 5,
  "comment": "Perfect rooms! Recommend."
}
```

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Review submitted successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
---------------------------------------------

## API: getNotifications: GET /customer/notifications
**Role:** `CUSTOMER` or `ADMIN`
Retrieves paginated, personal context in-app notifications.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "bookingId": 120,
        "title": "Booking Confirmed",
        "message": "Your booking Deluxe King Room has been successfully verified.",
        "notificationType": "BOOKING_CONFIRMED",
        "isRead": false,
        "readAt": null,
        "createdAt": "2026-05-22T07:00:00"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
--------------------------------------------------------------

# 18. Controller: GuestController
**Security:** Entirely Public (`.permitAll()`).

## API: getHotelById: GET /hotel
**Role:** Public
View public hotel properties.

### Success Response (JSON)
{
    "success": true,
    "message": "Successfully",
    "data": {
        "id": 1,
        "name": "Sunrise Luxury Hotel",
        "description": "5-star hotel near My Khe beach",
        "starRating": 4.8,
        "address": "Da Nang City",
        "phoneNumber": "0988888888",
        "email": "sunrise@gmail.com",
        "mapUrl": "https://maps.google.com/xyz",
        "createdAt": "2026-05-19T17:54:19.5",
        "updatedAt": "2026-05-22T00:25:20.0462438",
        "images": [
            {
                "id": 1,
                "imageUrl": "https://res.cloudinary.com/do8uakd0l/image/upload/v1774416942/hotel/room-types/pmdhqiqd5pvwuv7wc7pm.jpg",
                "isPrimary": true,
                "caption": "Ảnh mặt tiền khách sạn"
            },
            {
                "id": 2,
                "imageUrl": "https://res.cloudinary.com/do8uakd0l/image/upload/v1774416942/hotel/room-types/pmdhqiqd5pvwuv7wc7pm.jpg",
                "isPrimary": false,
                "caption": "Khu vực hồ bơi"
            }
        ],
        "amenities": [
            {
                "id": 1,
                "name": "Wifi miễn phí",
                "description": "Wifi tốc độ cao toàn khuôn viên"
            },
            {
                "id": 2,
                "name": "Hồ bơi vô cực",
                "description": "Hồ bơi ngoài trời tầng thượng"
            },
            {
                "id": 3,
                "name": "Phòng Gym",
                "description": "Phòng tập đầy đủ máy móc hiện đại"
            }
        ]
    },
    "errors": null,
    "timestamp": "2026-05-22T10:17:47"
}

---------------------------------------------------

## API: getAllActiveRoomTypes: GET /hotel/room-types
**Role:** Public
Returns all active room types available for public guests.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "name": "Deluxe King Room",
        "description": "Luxurious suite with one king-sized bed.",
        "pricePerDay": 75.00,
        "pricePerHour": 10.00,
        "maxAdults": 2,
        "maxChildren": 1,
        "bedCount": 1,
        "bedType": "KING",
        "roomSizeM2": 35.5,
        "thumbnail": "https://cloudinary.com/deluxe_thumbnail.jpg"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

-----------------------------------------------

## API: search: GET /hotel/room-types/search 
**Role:** Public
Searches for available room types based on filters.

### Parameters (Query Parameters)
Accepts query variables mapping to `GuestSearchRoomRequest`:
| Name | Type | Required | Description |
|---|---|---|---|
| `bookingType` | String | No | Search type (`DAILY`/`HOURLY`) |
| `minPrice` | BigDecimal | No | Lower price limit |
| `maxPrice` | BigDecimal | No | Upper price limit |
| `adults` | Integer | No | Minimum capacity for adults |
| `children` | Integer | No | Minimum capacity for children |
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "roomTypeId": 1,
        "roomTypeName": "Deluxe King Room",
        "description": "Luxurious suite with one king-sized bed.",
        "pricePerDay": 75.00,
        "pricePerHour": 10.00,
        "maxAdults": 2,
        "maxChildren": 1,
        "bedCount": 1,
        "bedType": "KING",
        "roomSizeM2": 35.5,
        "thumbnail": "https://cloudinary.com/deluxe_thumbnail.jpg"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

-----------------------------------------------------

## API: getDetail: GET /hotel/room-types/{id}
**Role:** Public
Retrieves detail info of room types, including photo gallery, items, and rating reviews.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `id` | Integer | Path Variable | Yes | Room Type ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "roomTypeId": 1,
    "roomTypeName": "Deluxe King Room",
    "description": "Luxurious suite with one king-sized bed.",
    "pricePerDay": 75.00,
    "pricePerHour": 10.00,
    "maxAdults": 2,
    "maxChildren": 1,
    "bedCount": 1,
    "bedType": "KING",
    "roomSizeM2": 35.5,
    "images": [
      {
        "imageUrl": "https://cloudinary.com/image1.jpg",
        "isPrimary": true,
        "caption": "Living room setup"
      }
    ],
    "items": [
      {
        "itemName": "Mini Refrigerator",
        "description": "Premium small cooling fridge",
        "quantity": 1,
        "baseUnitPrice": 120.00,
        "itemImageUrl": "https://cloudinary.com/fridge.jpg"
      }
    ],
    "averageRating": 4.8,
    "totalReviews": 1,
    "reviews": [
      {
        "customerName": "Alice Johnson",
        "rating": 5,
        "comment": "Super clean! Loving this space.",
        "hotelReply": "Glad you enjoyed your stay!",
        "createdAt": "2026-05-20T22:00:00"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

-------------------------------------------------

## API: checkAvailability: GET /hotel/room-types/availability
**Role:** Public
Real-time capability checking to verify availability and calculate total pricing prior to checkout.

### Parameters (Query Parameters)
All fields in `CheckAvailabilityRequest`:
| Name | Type | Required | Description |
|---|---|---|---|
| `roomTypeId` | Integer | Yes | Target Room Type ID |
| `checkIn` | LocalDateTime | Yes | Target check-in timestamp (`YYYY-MM-DDTHH:MM:SS`) |
| `checkOut` | LocalDateTime | Yes | Target check-out timestamp |
| `numberOfRoom` | Integer | Yes | Count of requested rooms |
| `bookingType` | String | Yes | Check mode (`DAILY`/`HOURLY`) |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "available": true,
    "totalRooms": 10,
    "occupiedRooms": 4,
    "availableRooms": 6,
    "totalAmount": 150.00,
    "listRoomCanBook": [101, 103, 104, 105, 106, 107],
    "message": "Room type is available"
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```
{
    "success": true,
    "message": "Successfully",
    "data": {
        "available": false,
        "totalRooms": 2,
        "occupiedRooms": 0,
        "availableRooms": 2,
        "totalAmount": 1600000.00,
        "listRoomCanBook": [
            1,
            2
        ],
        "message": "Unavailable - only 2 rooms left"
    },
    "errors": null,
    "timestamp": "2026-05-24T18:21:08"
}

---------------------------------------------------

# 19. Controller: OTAChannelController
**Security:** Requires `ROLE_ADMIN` (JWT Required).

## API: create: POST /admin/ota-channels
**Role:** `ADMIN`
Binds and registers an external online travel agency channel (e.g. Agoda, Booking.com).

### Request Body (JSON)
```json
{
  "name": "Agoda",
  "apiKeySecret": "AGODA-API-KEY-SECRET-HASH",
  "webhookSecret": "AGODA-WEBHOOK-SECRET-HASH",
  "isActive": true
}
```

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "OTA Channel created successfully",
  "data": {
    "id": 1,
    "name": "Agoda",
    "apiKeySecret": "AGODA-API-KEY-SECRET-HASH",
    "webhookSecret": "AGODA-WEBHOOK-SECRET-HASH",
    "isActive": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

----------------------------------------------------

## API: getAll: GET /admin/ota-channels
**Role:** `ADMIN`
View active/inactive travel agency channels.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `keyword` | String | No | Search by name |
| `isActive` | Boolean | No | Filter by active status |
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "name": "Agoda",
        "apiKeySecret": "AGODA-API-KEY-SECRET-HASH",
        "webhookSecret": "AGODA-WEBHOOK-SECRET-HASH",
        "isActive": true
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

------------------------------------------------

## API: update: PUT /admin/ota-channels/{otaId}
**Role:** `ADMIN`
Update credentials or active toggle properties of an OTA channel.

### Request Body (JSON)
```json
{
  "name": "Agoda Premium",
  "apiKeySecret": "AGODA-API-KEY-SECRET-HASH-NEW",
  "webhookSecret": "AGODA-WEBHOOK-SECRET-HASH-NEW",
  "isActive": true
}
```

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `otaId` | Integer | Path Variable | Yes | OTA channel ID |

### Success Response (JSON)
{
  "success": true,
  "message": "OTA Channel created successfully",
  "data": {
    "id": 1,
    "name": "Agoda Premium",
    "apiKeySecret": "AGODA-API-KEY-SECRET-HASH-NEW",
    "webhookSecret": "AGODA-WEBHOOK-SECRET-HASH-NEWs",
    "isActive": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}

-----------------------------------------------------

## API: createBooking: POST /admin/ota-channels/booking
**Role:** Public (Webhook access)
Incoming integration webhook to sync booking requests from third-party distribution channels.

### Request Body (JSON)
```json
{
  "bookingId": "AGD-12345",
  "otaChannel": "Agoda",
  "otaHotelId": "AGD-HOTEL-77",
  "guest": {
    "fullName": "Elizabeth Bennet",
    "phone": "0987333555",
    "email": "lizzy@gmail.com",
    "nationality": "British"
  },
  "room": {
    "roomTypeCode": "RT-DELUXE",
    "roomTypeName": "Deluxe King Room",
    "quantity": 1,
    "adults": 2,
    "children": 0
  },
  "stay": {
    "checkIn": "2026-06-15T14:00:00",
    "checkOut": "2026-06-18T12:00:00",
    "nights": 3
  },
  "pricing": {
    "currency": "USD",
    "roomAmount": 225.00,
    "taxAmount": 22.50,
    "serviceFee": 15.00,
    "totalAmount": 262.50,
    "commissionAmount": 39.38
  },
  "payment": {
    "paymentType": "ONLINE_CREDIT",
    "paymentStatus": "PAID"
  },
  "specialRequests": [
    "High floor",
    "Early check-in"
  ],
  "status": "CONFIRMED",
  "createdAt": "2026-05-22T07:00:00",
  "lastUpdatedAt": "2026-05-22T07:00:00"
}
```

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "OTA booking created successfully",
  "data": "OTA_BOOKING_CREATED",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

------------------------------------------------------------

# 20. Controller: ReceptionBookingController  
**Security:** Requires `ROLE_RECEPTIONIST` or `ROLE_ADMIN` (JWT Required).

## API: check: POST /receptionist/bookings/check    00000
**Role:** `RECEPTIONIST` or `ADMIN`
Performs a check-in availability analysis for front-desk requests.

### Request Body (JSON)
All fields in `CheckAvailabilityRequest`:
| Name | Type | Required | Description |
|---|---|---|---|
| `roomTypeId` | Integer | Yes | Target Room Type ID |
| `checkIn` | LocalDateTime | Yes | Target check-in timestamp (`YYYY-MM-DDTHH:MM:SS`) |
| `checkOut` | LocalDateTime | Yes | Target check-out timestamp |
| `numberOfRoom` | Integer | Yes | Count of requested rooms |
| `bookingType` | String | Yes | Check mode (`DAILY`/`HOURLY`) |

### Success Response (JSON)
{
  "success": true,
  "message": "Successfully",
  "data": {
    "available": true,
    "totalRooms": 10,
    "occupiedRooms": 4,
    "availableRooms": 6,
    "totalAmount": 150.00,
    "listRoomCanBook": [101, 103, 104, 105, 106, 107],
    "message": "Room type is available"
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}

{
    "success": true,
    "message": "Successfully",
    "data": {
        "available": false,
        "totalRooms": 2,
        "occupiedRooms": 0,
        "availableRooms": 2,
        "totalAmount": 1600000.00,
        "listRoomCanBook": [
            1,
            2
        ],
        "message": "Unavailable - only 2 rooms left"
    },
    "errors": null,
    "timestamp": "2026-05-24T18:21:08"
}
--------------------------------------------------------

## API: createWalkIn: POST /receptionist/bookings/walk-in   00000
**Role:** `RECEPTIONIST` or `ADMIN`
Handles face-to-face walk-in check-in booking requests at the receptionist desk.

### Request Body (JSON)
```json
{
  "availabilityRequest": {
    "roomTypeId": 1,
    "checkIn": "2026-05-22T07:30:00",
    "checkOut": "2026-05-24T12:00:00",
    "numberOfRoom": 1,
    "bookingType": "DAILY"
  },
  "customerName": "George Knightley",
  "customerPhone": "0987222444",
  "customerEmail": "george@gmail.com",
  "notes": "Front-desk Walk-in check-in"
}
```

### Success Response (JSON)
*HTTP Status 201 Created*
```json
{
  "success": true,
  "message": "Walk-in booking created successfully",
  "data": {
    "bookingId": 125,
    "status": "CONFIRMED",
    "message": "Booking successful",
    "numberOfRooms": 1,
    "totalAmount": 150.00
  },
  "errors": null,
  "timestamp": "2026-05-22T07:30:00"
}
```

--------------------------------------------------------

## API: getAllBookings: GET /receptionist/bookings   00000
 **Role:** `RECEPTIONIST` or `ADMIN`
Views all system bookings (paginated, sorted newest first).

### Parameters (Query Parameters)
Same sorting and pagination options as `AdminBookingController` -> `getAllBookings`.

### Success Response (JSON)
{
    "success": true,
    "message": "Successfully",
    "data": {
        "content": [
            {
                "id": 3,
                "customerId": 7,
                "customerName": "John V Ne",
                "customerPhone": "0901234367",
                "customerEmail": "updatedattruong02112004@gmail.com",
                "roomTypeId": 1,
                "roomTypeName": "STANDARD",
                "requestedQuantity": 1,
                "requestedCheckin": "2026-05-20T14:00:00",
                "requestedCheckout": "2026-05-21T12:00:00",
                "bookingType": "DAILY",
                "bookingSource": "WEB",
                "status": "CHECKED_OUT",
                "totalAmount": 400000.00,
                "paymentStatus": "PAID",
                "createdAt": null
            },
            {
                "id": 2,
                "customerId": 7,
                "customerName": "John V Ne",
                "customerPhone": "0901234367",
                "customerEmail": "updatedattruong02112004@gmail.com",
                "roomTypeId": 1,
                "roomTypeName": "STANDARD",
                "requestedQuantity": 1,
                "requestedCheckin": "2026-05-20T10:20:00",
                "requestedCheckout": "2026-05-22T10:15:00",
                "bookingType": "DAILY",
                "bookingSource": "WEB",
                "status": "CHECKED_IN",
                "totalAmount": 400000.00,
                "paymentStatus": "PAID",
                "createdAt": null
            },
            {
                "id": 1,
                "customerId": 1,
                "customerName": "Nguyễn Văn A",
                "customerPhone": "0901234567",
                "customerEmail": "nguyenvana@email.com",
                "roomTypeId": 1,
                "roomTypeName": "STANDARD",
                "requestedQuantity": 1,
                "requestedCheckin": "2024-05-10T14:00:00",
                "requestedCheckout": "2024-05-12T12:00:00",
                "bookingType": "DAILY",
                "bookingSource": "AGODA",
                "status": "CHECKED_OUT",
                "totalAmount": 2500000.00,
                "paymentStatus": "PAID",
                "createdAt": null
            }
        ],
        "page": 0,
        "size": 10,
        "totalElements": 3,
        "totalPages": 1,
        "last": true
    },
    "errors": null,
    "timestamp": "2026-05-22T10:13:52"
}

-------------------------------------------------

## API: getBookingDetail: GET /receptionist/bookings/{bookingId}    000000
**Role:** `RECEPTIONIST` or `ADMIN`
Retrieves detail variables for a booking from a receptionist context.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `bookingId` | Integer | Path Variable | Yes | Booking ID |

### Success Response (JSON)
{
    "success": true,
    "message": "Successfully",
    "data": {
        "bookingId": 3,
        "bookingType": "DAILY",
        "bookingSource": "WEB",
        "bookingStatus": "CHECKED_OUT",
        "paymentStatus": "PAID",
        "requestedQuantity": 1,
        "totalAmount": 400000.00,
        "notes": "",
        "requestedCheckin": "2026-05-20T14:00:00",
        "requestedCheckout": "2026-05-21T12:00:00",
        "createdAt": "2026-05-21T23:43:45.1475261",
        "customerId": 7,
        "customerName": "John V Ne",
        "customerPhone": "0901234367",
        "customerEmail": "updatedattruong02112004@gmail.com",
        "customerUsername": "vandat1",
        "customerAvatar": null,
        "customerGender": "MALE",
        "customerDateOfBirth": "2000-01-01",
        "roomTypeId": 1,
        "roomTypeName": "STANDARD",
        "roomTypeDescription": "Phòng tiêu chuẩn, tiện nghi cơ bản đầy đủ, phù hợp cho cặp đôi hoặc khách đi công tác ngắn ngày.",
        "pricePerDay": 400000.00,
        "pricePerHour": 120000.00,
        "maxAdults": 2,
        "maxChildren": 1,
        "bedCount": 1,
        "bedType": "SINGLE",
        "roomSizeM2": 20.5,
        "roomSchedules": [
            {
                "roomScheduleId": 3,
                "roomId": 2,
                "roomNumber": "S103",
                "floor": 1,
                "roomStatus": "READY",
                "allocatedFor": "HOURLY",
                "startAt": "2026-05-22T14:00:00",
                "endAt": "2026-05-23T12:00:00",
                "status": "SCHEDULED",
                "roomKeyId": null,
                "codeNumber": null,
                "qrCodeData": null,
                "roomKeyStatus": null,
                "activatedAt": null,
                "expiredAt": null
            }
        ],
        "payments": [
            {
                "id": 2,
                "amount": 400000.00,
                "paymentMethod": "ONLINE",
                "gatewayName": "VNPAY",
                "paymentType": "FULL_ROOM_CHARGE",
                "status": "SUCCESS",
                "transactionReference": "1779381844158",
                "paymentDate": "2026-05-21T23:44:04.1715883",
                "notes": "Thanh toán hóa đơn qua trang cá nhân"
            }
        ]
    },
    "errors": null,
    "timestamp": "2026-05-22T10:13:33"
}

-----------------------------------------------------

## API: searchBookings: GET /receptionist/bookings/search    000000
**Role:** `RECEPTIONIST` or `ADMIN`
Search guest bookings by names/emails keyword query.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `keyword` | String | No | Search keyword | - Nhập tên, sdt, email
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
{
    "success": true,
    "message": "Successfully",
    "data": {
        "content": [
            {
                "id": 3,
                "customerId": 7,
                "customerName": "John V Ne",
                "customerPhone": "0901234367",
                "customerEmail": "updatedattruong02112004@gmail.com",
                "roomTypeId": 1,
                "roomTypeName": "STANDARD",
                "requestedQuantity": 1,
                "requestedCheckin": "2026-05-20T14:00:00",
                "requestedCheckout": "2026-05-21T12:00:00",
                "bookingType": "DAILY",
                "bookingSource": "WEB",
                "status": "CHECKED_OUT",
                "totalAmount": 400000.00,
                "paymentStatus": "PAID",
                "createdAt": null
            },
            {
                "id": 2,
                "customerId": 7,
                "customerName": "John V Ne",
                "customerPhone": "0901234367",
                "customerEmail": "updatedattruong02112004@gmail.com",
                "roomTypeId": 1,
                "roomTypeName": "STANDARD",
                "requestedQuantity": 1,
                "requestedCheckin": "2026-05-20T10:20:00",
                "requestedCheckout": "2026-05-22T10:15:00",
                "bookingType": "DAILY",
                "bookingSource": "WEB",
                "status": "CHECKED_IN",
                "totalAmount": 400000.00,
                "paymentStatus": "PAID",
                "createdAt": null
            }
        ],
        "page": 0,
        "size": 10,
        "totalElements": 2,
        "totalPages": 1,
        "last": true
    },
    "errors": null,
    "timestamp": "2026-05-22T10:12:43"
}

-------------------------------------------------------

## API: cancelBooking: PUT /receptionist/bookings/{bookingId}/cancel    000000
**Role:** `RECEPTIONIST` or `ADMIN`
Allows the receptionist to cancel a booking.

### Request Body (JSON)
```json
{
  "reason": "Guest canceled booking in person due to transport delays."
}
```

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `bookingId` | Integer | Path Variable | Yes | Booking ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

----------------------------------------------------

## API: refundBooking: PUT /receptionist/bookings/{bookingId}/refund    000000
**Role:** `RECEPTIONIST` or `ADMIN`
Process refund payout logic for eligible cancelled guest deposits.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `bookingId` | Integer | Path Variable | Yes | Booking ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Refund processed successfully",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

-----------------------------------------------------------------

## API: createReceptionPayment: POST /receptionist/bookings/pay     000000
**Role:** `RECEPTIONIST` or `ADMIN`
Log cash or direct card payments processed offline at the physical check-in front desk.

### Request Body (JSON)
```json
{
  "bookingId": 125,
  "paymentMethod": "CASH",
  "notes": "Collected cash at front-desk check-in"
}
```

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Payment recorded successfully",
  "data": "PAYMENT_RECORDED_SUCCESSFULLY",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

---------------------------------------------------------

## API: checkInBooking: POST /receptionist/bookings/{bookingId}/check-in    000000
**Role:** `RECEPTIONIST` or `ADMIN`
Performs check-in for a booking, activating the room status to `ACTIVE` and creating digital room key values.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `bookingId` | Integer | Path Variable | Yes | Booking ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Check-in successful",
  "data": "CHECK_IN_SUCCESSFUL",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

--------------------------------------------------------------------

## API: checkOutBooking: POST /receptionist/bookings/{bookingId}/check-out     000000
**Role:** `RECEPTIONIST` or `ADMIN`
Checks out a booking, marking the rooms as `DIRTY` to alert the cleaning staff.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `bookingId` | Integer | Path Variable | Yes | Booking ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Check-out successful",
  "data": "CHECK_OUT_SUCCESSFUL",
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

----------------------------------------------------------

## API: getUpcomingCheckIns: GET /receptionist/bookings/upcoming-checkin   00000
**Role:** `RECEPTIONIST` or `ADMIN`
Views all confirmed bookings scheduled to check in today.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "id": 120,
        "customerName": "John Doe",
        "customerPhone": "0912345678",
        "roomTypeName": "Deluxe King Room",
        "requestedQuantity": 1,
        "requestedCheckin": "2026-06-01T14:00:00",
        "requestedCheckout": "2026-06-03T12:00:00",
        "status": "CONFIRMED",
        "paymentStatus": "PAID",
        "bookingSource": "WEB"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

-------------------------------------------------------------------

## API: getUpcomingCheckOut: GET /receptionist/bookings/upcoming-checkout 00000
**Role:** `RECEPTIONIST` or `ADMIN`
Views all active bookings scheduled to check out today before 15 munites.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
{
    "success": true,
    "message": "Successfully",
    "data": {
        "content": [
            {
                "id": 2,
                "customerName": "John V Ne",
                "customerPhone": "0901234367",
                "roomTypeName": "STANDARD",
                "requestedQuantity": 1,
                "requestedCheckin": "2026-05-20T10:20:00",
                "requestedCheckout": "2026-05-22T10:15:00",
                "status": "CHECKED_IN",
                "paymentStatus": "PAID",
                "bookingSource": "WEB"
            }
        ],
        "page": 0,
        "size": 10,
        "totalElements": 1,
        "totalPages": 1,
        "last": true
    },
    "errors": null,
    "timestamp": "2026-05-22T10:09:44"
}

-----------------------------------------------------

# 21. Controller: ReceptionDashboardController
**Security:** Requires `ROLE_RECEPTIONIST` or `ROLE_ADMIN` (JWT Required).0000  

## API: getTodayDashboard: GET /receptionist/dashboard/today 
**Role:** `RECEPTIONIST` or `ADMIN`
Summarizes key operational metrics for the receptionist dashboard, including room status and upcoming check-ins.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "totalActiveRooms": 50,
    "occupiedRooms": 22,
    "readyRooms": 20,
    "occupancyRate": 44.0,
    "todayRevenue": 1500.00,
    "yesterdayRevenue": 1400.00,
    "revenueGrowthPercent": 7.14,
    "upcomingCheckIns": [
      {
        "bookingId": 120,
        "customerName": "John Doe",
        "phone": "0912345678",
        "startAt": "2026-06-01T14:00:00",
        "roomTypeName": "Deluxe King Room"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

---------------------------------------------------

## API: getWeeklyActive: GET /receptionist/dashboard/room-weekly-active   0900000
**Role:** `RECEPTIONIST` or `ADMIN`
Retrieves the active rooms count trend for the past 7 days.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": [
    {
      "day": "Monday",
      "activeCount": 24
    },
    {
      "day": "Tuesday",
      "activeCount": 25
    }
  ],
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

---------------------------------------------------------

## API: getAll: GET /receptionist/dashboard/customer-notification  000000
**Role:** `RECEPTIONIST` or `ADMIN`
Retrieves a paginated list of guest bookings/check-in/check-out notification alerts.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
{
    "success": true,
    "message": "Successfully",
    "data": {
        "content": [
            {
                "id": 4,
                "bookingId": 2,
                "title": "BOOKING ROOM IN CHECK-X",
                "message": "Cancel Booking Success.",
                "notificationType": "BOOKING_CANCEL",
                "isRead": false,
                "readAt": null,
                "createdAt": "2026-05-22T00:17:23.7987109"
            },
            {
                "id": 3,
                "bookingId": 3,
                "title": "BOOKING ROOM IN CHECK-X",
                "message": "Payment Success.",
                "notificationType": "PAYMENT_SUCCESS",
                "isRead": false,
                "readAt": null,
                "createdAt": "2026-05-21T23:44:08.6889004"
            },
            {
                "id": 2,
                "bookingId": 3,
                "title": "BOOKING ROOM IN CHECK-X",
                "message": "Room reservation successful, please process your booking within 1 minute.",
                "notificationType": "BOOKING_SUCCESS",
                "isRead": false,
                "readAt": null,
                "createdAt": "2026-05-21T23:43:50.1709901"
            },
            {
                "id": 1,
                "bookingId": 2,
                "title": "BOOKING ROOM IN CHECK-X",
                "message": "Room reservation successful, please process your booking within 1 minute.",
                "notificationType": "BOOKING_SUCCESS",
                "isRead": false,
                "readAt": null,
                "createdAt": "2026-05-21T23:35:45.6454924"
            }
        ],
        "page": 0,
        "size": 10,
        "totalElements": 4,
        "totalPages": 1,
        "last": true
    },
    "errors": null,
    "timestamp": "2026-05-22T10:06:48"
}

----------------------------------------------------------------

# 22. Controller: RoomRealtimeController    00000
**Security:** Requires `ROLE_RECEPTIONIST` or `ROLE_ADMIN` (JWT Required).

## API: getTodayRooms: GET /receptionist/rooms/today
**Role:** `RECEPTIONIST` or `ADMIN`

Retrieves real-time status of all physical hotel rooms, grouped by room type.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": [
    {
      "roomTypeId": 1,
      "roomTypeName": "Deluxe King Room",
      "rooms": [
        {
          "roomId": 101,
          "roomNumber": "101",
          "floor": 1,
          "roomTypeName": "Deluxe King Room",
          "roomStatus": "ACTIVE",
          "customerName": "George Knightley"
        },
        {
          "roomId": 102,
          "roomNumber": "102",
          "floor": 1,
          "roomTypeName": "Deluxe King Room",
          "roomStatus": "DIRTY",
          "customerName": null
        }
      ]
    }
  ],
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

----------------------------------------------------

# 23. Controller: StaffController 
**Security:** Requires `ROLE_CLEANER` or `ROLE_RECEPTIONIST` (JWT Required).

## API: getMyProfile: GET /staff/me 
**Role:** `CLEANER` or `RECEPTIONIST`
Retrieves the logged-in staff member's own detailed profile.

### Success Response (JSON)
{
    "success": true,
    "message": "Successfully",
    "data": {
        "id": 3,
        "username": "cleaner_user1",
        "email": "cleaner@example.com",
        "emailVerified": true,
        "fullName": "Cleaner User A",
        "phone": "0901000003",
        "avatarUrl": "https://example.com/avatar/cleaner.png",
        "gender": "MALE",
        "dateOfBirth": "1999-05-25",
        "role": "CLEANER",
        "status": 1
    },
    "errors": null,
    "timestamp": "2026-05-22T10:05:51"
}

-----------------------------------------------

## API: getMyCurrentWeekShifts: GET /staff/my-current-week
**Role:** `CLEANER` or `RECEPTIONIST`
Retrieves the staff member's own shift assignments for the current week.

### Success Response (JSON)
{
    "success": true,
    "message": "Successfully",
    "data": [
        {
            "id": 2,
            "userId": 3,
            "fullName": "Cleaner User A",
            "email": "cleaner@example.com",
            "role": "CLEANER",
            "staffRoleId": 1,
            "staffRole": "CLEANER",
            "baseSalary": 1.5E7,
            "shiftId": 1,
            "shiftName": "DAY SHIFT",
            "startTime": "00:00:01",
            "endTime": "12:00:00",
            "workDate": "2026-05-19"
        },
        {
            "id": 1,
            "userId": 3,
            "fullName": "Cleaner User A",
            "email": "cleaner@example.com",
            "role": "CLEANER",
            "staffRoleId": 1,
            "staffRole": "CLEANER",
            "baseSalary": 1.5E7,
            "shiftId": 1,
            "shiftName": "DAY SHIFT",
            "startTime": "00:00:01",
            "endTime": "12:00:00",
            "workDate": "2026-05-20"
        },
        {
            "id": 5,
            "userId": 3,
            "fullName": "Cleaner User A",
            "email": "cleaner@example.com",
            "role": "CLEANER",
            "staffRoleId": 1,
            "staffRole": "CLEANER",
            "baseSalary": 1.5E7,
            "shiftId": 2,
            "shiftName": "NIGHT SHIFT",
            "startTime": "12:00:00",
            "endTime": "23:59:00",
            "workDate": "2026-05-23"
        }
    ],
    "errors": null,
    "timestamp": "2026-05-22T10:04:57"
}

-----------------------------------------------------------------------------------------------------------------

## API: checkIn: POST /staff/check-in
**Role:** `CLEANER` or `RECEPTIONIST`
Logs a check-in attendance timestamp for the scheduled shift.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "attendanceId": 45,
    "userId": 10,
    "fullName": "Staff Member A",
    "role": "RECEPTIONIST",
    "assignId": 5,
    "shiftName": "Morning Shift",
    "checkIn": "2026-05-22T07:58:12",
    "lateMinutes": 0,
    "status": "PRESENT",
    "message": "Checked in successfully on time"
  },
  "errors": null,
  "timestamp": "2026-05-22T07:58:12"
}
```

-------------------------------------------------------------------------------------------------------------------------------

## API: checkOut: POST /staff/check-out/{assignmentId}
**Role:** `CLEANER` or `RECEPTIONIST`
Logs a check-out timestamp for the shift.

### Parameters
| Name | Type | Source | Required | Description |
|---|---|---|---|---|
| `assignmentId` | Integer | Path Variable | Yes | Scheduled Shift Assignment ID |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": "Checked out successfully at 16:01:00",
  "errors": null,
  "timestamp": "2026-05-22T16:01:00"
}
```

--------------------------------------------------------------------------------------------------------------------------------------------

## API: getMyAttendance: GET /staff/my-attendance
**Role:** `CLEANER` or `RECEPTIONIST`
Retrieves the staff member's own paginated history of attendances.

### Parameters (Query Parameters)
| Name | Type | Required | Description |
|---|---|---|---|
| `page` | int | No | Page index |
| `size` | int | No | Page size |

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "content": [
      {
        "attendanceId": 45,
        "userId": 10,
        "fullName": "Staff Member A",
        "role": "RECEPTIONIST",
        "assignId": 5,
        "shiftName": "Morning Shift",
        "checkIn": "2026-05-22T07:58:12",
        "lateMinutes": 0,
        "status": "PRESENT",
        "message": "Checked in successfully on time"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

-------------------------------------------------------------------------------------------------------------------------------

## API: viewCurrentMonthSalary: GET /staff/salary/current-month
**Role:** `CLEANER` or `RECEPTIONIST`
Retrieves the current monthly salary summary sheet details for the staff member.

### Success Response (JSON)
```json
{
  "success": true,
  "message": "Successfully",
  "data": {
    "salarySheetId": 12,
    "userId": 10,
    "fullName": "Staff Member A",
    "role": "RECEPTIONIST",
    "month": 5,
    "year": 2026,
    "attendanceCount": 22,
    "salaryPerShift": 25.00,
    "totalSalary": 550.00,
    "status": "UNPAID",
    "createAt": "2026-05-22T07:00:00",
    "updatedAt": "2026-05-22T07:00:00"
  },
  "errors": null,
  "timestamp": "2026-05-22T07:00:00"
}
```

--------------------------------------------------------
API GET http://localhost:8080/api/receptionist/rooms/timeline

{
    "success": true,
    "message": "Successfully fetched room timeline",
    "data": [
        {
            "roomId": 1,
            "roomNumber": "S101",
            "floor": 1,
            "roomTypeName": "STANDARD",
            "status": "DIRTY",
            "schedules": []
        },
        {
            "roomId": 2,
            "roomNumber": "S103",
            "floor": 1,
            "roomTypeName": "STANDARD",
            "status": "READY",
            "schedules": [
                {
                    "scheduleId": 23,
                    "bookingId": 21,
                    "customerName": "zandajt4",
                    "customerPhone": "0987789987",
                    "bookingType": "HOURLY",
                    "startAt": "2026-05-25T10:16:00",
                    "endAt": "2026-05-25T13:14:00",
                    "status": "ACTIVE",
                    "longStay": false,
                    "overdue": false
                }
            ]
        },
        {
            "roomId": 3,
            "roomNumber": "D201",
            "floor": 2,
            "roomTypeName": "DELUXE",
            "status": "READY",
            "schedules": [
                {
                    "scheduleId": 14,
                    "bookingId": 14,
                    "customerName": "Nguyen Van A",
                    "customerPhone": "0988888888",
                    "bookingType": "DAILY",
                    "startAt": "2026-05-25T14:00:00",
                    "endAt": "2026-05-26T12:00:00",
                    "status": "ACTIVE",
                    "longStay": true,
                    "overdue": false
                }
            ]
        },
        {
            "roomId": 4,
            "roomNumber": "D203",
            "floor": 2,
            "roomTypeName": "DELUXE",
            "status": "DIRTY",
            "schedules": []
        },
        {
            "roomId": 5,
            "roomNumber": "D204",
            "floor": 2,
            "roomTypeName": "DELUXE",
            "status": "READY",
            "schedules": []
        },
        {
            "roomId": 6,
            "roomNumber": "V301",
            "floor": 3,
            "roomTypeName": "VIP",
            "status": "READY",
            "schedules": []
        }
    ],
    "errors": null,
    "timestamp": "2026-05-25T11:24:22"
}



CLEANER
Lấy danh sách baseItem trong phòng
API GET /bookings/{bookingId}/damage-items

Gửi Báo cáo hư hỏng
API POST /bookings/{bookingId}/damages
