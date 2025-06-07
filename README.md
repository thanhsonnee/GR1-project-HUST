# Phát triển ứng dụng logistic kết hợp tối ưu hóa tuyến đường sử dụng thuật toán ACO
ACO là thuật toán tìm kiếm đường đi tối ưu trong đồ thị dựa trên hành vi tìm kiếm đường đi của kiến từ tổ của chúng cho đến nguồn thức ăn.
+ Kiến tìm đường ngắn nhất từ tổ đến nguồn thức ăn
+ Kiến để lại pheromone trên đường đi
+ Kiến có xu hướng đi theo đường có nhiều pheromone

## Project Structure
```
 frontend/          # React frontend application
 backend/          # NestJS backend application
```

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Development

- Backend: http://localhost:3001
- Frontend: http://localhost:3000

## Features

- Route Optimization sử dụng Ant Colony Optimization Algorithms (ACO)
- Vehicle Management
- Analytics Dashboard
- Real-time Tracking

## Dependencies

### Backend
- NestJS
- TypeORM
- PostgreSQL
- Class Validator

### Frontend
- React
- Material-UI
- React Router
- Axios 