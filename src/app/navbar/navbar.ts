import { Component, ChangeDetectorRef } from '@angular/core';
import { StudentsTable } from "../students-table/students-table";
import { Student } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [StudentsTable, CommonModule],
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
}
