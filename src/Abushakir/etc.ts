//
import { Calendar } from '../Interfaces/Calendar';

export default class ETC implements Calendar {
  getYear(): number {
    throw new Error('Method not implemented.');
  }
  getMonth(): number {
    throw new Error('Method not implemented.');
  }
  getDay(): number {
    throw new Error('Method not implemented.');
  }
  getMonthName(): String {
    throw new Error('Method not implemented.');
  }
  monthDays(): undefined[] {
    throw new Error('Method not implemented.');
  }
  yearDays(): undefined[] {
    throw new Error('Method not implemented.');
  }
}
