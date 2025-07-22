import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
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
  @Output() sectionChanged = new EventEmitter<string>();

  students: Student[] = [];
  activeSection = "students";

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.http.get<Student[]>('mocks/students.json').subscribe(data => {
      this.students = data;
      this.cdr.detectChanges();
    });
  }

  navigate(section: string) {
    this.activeSection = section;
    this.sectionChanged.emit(section); // útil si otro componente necesita saber el cambio
  }

  addStudent(student: Student) {
    console.log('Adding student:', student);
    this.students = [...this.students, student];
  }
}
