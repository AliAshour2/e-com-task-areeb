import { Component, Input } from '@angular/core';
import { DeveloperCardComponent } from '../../components/developer-card/developer-card.component';

import { FormsModule } from '@angular/forms'; // 
import { SearchService } from '../../shared/services/search/search.service';
import { SelectfilterComponent } from "../../shared/components/select/selectfilter/selectfilter.component";
import { AddDeveloperForm, ContactStatus, Developer } from '../../models/card.model';
import { ModalComponent } from "../../shared/components/modal/modal/modal.component";
import { AddDeveloperFormComponent } from "../../components/add-developer-form/add-developer-form.component";
@Component({
  selector: 'app-shop',
  imports: [DeveloperCardComponent, FormsModule, SelectfilterComponent, ModalComponent, AddDeveloperFormComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  standalone : true ,
})
export class ShopComponent {
  searchQuery = '';
  // @Input() searchQuery = '';
  selectedSort = 'default';
  selectedLevel = 'all';

  showAddModal = false;
  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  onAddDeveloper(newDev: AddDeveloperForm) {
    this.developers.push({
      ...newDev,
      id: this.generateId(), // Only new ones get an id
      status: ContactStatus.NotContacted,
      image: 'https://i.pravatar.cc/100?img=' + (Math.floor(Math.random() * 70) + 1)
    });
    this.closeAddModal();
  }

  private generateId() {
    const ids = this.developers
      .map(d => d.id)
      .filter(id => typeof id === 'number');
    return ids.length ? Math.max(...ids) + 1 : 1;
  }
 


  sortOptions = [
  { value: 'low', label: 'Price: Low to High' },
  { value: 'high', label: 'Price: High to Low' }
];

sizeOptions = [
  { value: 'Junior', label: 'Junior' },
  { value: 'Mid', label: 'Mid-Level' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Lead', label: 'Lead' },
  { value: 'all', label: 'All Levels' }
];
  

  developers: Developer[] = [
  {
    image: "https://i.pravatar.cc/100?img=1",
    name: "Sara Hassan",
    role: "Frontend Developer",
    level: "Mid",
    salary: 5000,
    description: "Specializes in building responsive UIs with Angular and React.",
    status: ContactStatus.NotContacted
  },
  {
    image: "https://i.pravatar.cc/100?img=2",
    name: "Ahmed ElSayed",
    role: "Backend Developer",
    level: "Senior",
    salary: 7500,
    description: "Experienced in Node.js, Express, and scalable REST APIs.",
    status: ContactStatus.NotContacted
  },
  {
    image: "https://i.pravatar.cc/100?img=3",
    name: "Yasmine Adel",
    role: "UI/UX Designer",
    level: "Mid",
    salary: 6000,
    description: "Focuses on user-centric design for web and mobile apps.",
    status: ContactStatus.NotContacted
  },
  {
    image: "https://i.pravatar.cc/100?img=4",
    name: "Omar Nabil",
    role: "DevOps Engineer",
    level: "Junior",
    salary: 4500,
    description: "Helps automate CI/CD pipelines and cloud deployment.",
    status: ContactStatus.NotContacted
  },
  {
    image: "https://i.pravatar.cc/100?img=5",
    name: "Laila Fathy",
    role: "QA Engineer",
    level: "Senior",
    salary: 5800,
    description: "Ensures software quality through manual and automated testing.",
    status: ContactStatus.NotContacted
  },
  {
    image: "https://i.pravatar.cc/100?img=6",
    name: "Mohamed Saeed",
    role: "Project Manager",
    level: "Lead",
    salary: 9000,
    description: "Coordinates tech teams and ensures timely delivery of projects.",
    status: ContactStatus.NotContacted
  },
];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.currentSearchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
  }


  onContact(developer: any) {
    const found = this.developers .find(p => p.name === developer.name);
    if (found) {
      found.status = found.status === ContactStatus.Contacted ? ContactStatus.NotContacted : ContactStatus.Contacted;
    }
  }

  get filteredDevelopers() {
    let filtered = [...this.developers ];

    if (this.selectedLevel !== 'all') {
      filtered = filtered.filter((p) => p.level === this.selectedLevel);
    }

    if (this.selectedSort === 'low') {
      filtered.sort((a, b) => a.salary - b.salary);
    } else if (this.selectedSort === 'high') {
      filtered.sort((a, b) => b.salary - a.salary);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.trim().toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
    }

    return filtered;
  }
}
