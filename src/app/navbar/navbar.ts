import { Component, ChangeDetectorRef } from '@angular/core';
import { StudentsTable } from "../students-table/students-table";
import { Student } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddForm } from '../add-form/add-form';

@Component({
  selector: 'app-navbar',
  imports: [StudentsTable, CommonModule, AddForm],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  students: Student[] = [];
  activeSection = "students";

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.http.get<Student[]>('mocks/students.json').subscribe(data => {
      this.students = data;

      // 👇 Forzamos a Angular a detectar cambios
      this.cdr.detectChanges();
    });
  }

  addStudent(student: Student) {
    console.log('Adding student:', student);
    // Emit the new student to the students array
    /*  this.students.push(student); */
    //perder referencia
    this.students = [...this.students, student];
  }
}
