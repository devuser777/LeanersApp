import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

interface StudentFee {
  id: number;
  name: string;
  course: string;
  monthlyFee: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  reminder: string;
}

@Component({
  selector: 'app-root',
  imports: [NgClass],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  title = 'Learners App';

  students: StudentFee[] = [
    { id: 1, name: 'Aisha Khan', course: 'Mathematics', monthlyFee: 2500, dueDate: '2026-10-25', status: 'Pending', reminder: 'Reminder due in 2 days' },
    { id: 2, name: 'Daniel Lee', course: 'Physics', monthlyFee: 3200, dueDate: '2026-10-18', status: 'Overdue', reminder: 'Payment overdue by 3 days' },
    { id: 3, name: 'Sara Smith', course: 'English', monthlyFee: 2100, dueDate: '2026-10-28', status: 'Paid', reminder: 'Paid this month' },
    { id: 4, name: 'Rahul Verma', course: 'Chemistry', monthlyFee: 2800, dueDate: '2026-10-22', status: 'Pending', reminder: 'Reminder due today' },
  ];

  get totalStudents(): number {
    return this.students.length;
  }

  get totalCollected(): number {
    return this.students
      .filter((student) => student.status === 'Paid')
      .reduce((sum, student) => sum + student.monthlyFee, 0);
  }

  get totalDue(): number {
    return this.students
      .filter((student) => student.status !== 'Paid')
      .reduce((sum, student) => sum + student.monthlyFee, 0);
  }

  get pendingStudents(): number {
    return this.students.filter((student) => student.status === 'Pending').length;
  }

  markAsPaid(student: StudentFee): void {
    student.status = 'Paid';
    student.reminder = 'Paid this month';
  }

  sendReminder(student: StudentFee): void {
    student.reminder = 'Reminder sent to parent';
    if (student.status === 'Overdue') {
      student.status = 'Pending';
    }
  }
}

