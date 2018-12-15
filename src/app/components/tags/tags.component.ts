import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent  {
  @Input() videoList;
  @Input() selectedVideo;
  @Output() valueChange = new EventEmitter();
  form: FormGroup;
  
    tags = [{id: 100, name: 'order 1' }];
// orders = [    
//     { id: 100, name: 'order 1' },
//     { id: 200, name: 'order 2' },
//     { id: 300, name: 'order 3' },
//     { id: 400, name: 'order 4' }
//   ];

  constructor(private data: DataService, private formBuilder: FormBuilder) {
    //console.log(`@ this.videoList = ${this.videoList}`);

    // const controls = this.orders.map(c => new FormControl(false));
    // controls[0].setValue(true);

    // this.form = this.formBuilder.group({
    //   orders: new FormArray(controls, minSelectedCheckboxes(1))
    // });
  }

  compare(b,a) {
    if (a.count < b.count)
      return -1;
    if (a.count > b.count)
      return 1;
    return 0;
  }

  get formData() {
    console.log('get formData() {');
    // return this.form.get('Data'); 
    // form.controls.orders.controls
    return this.form.get('form.controls.tags.controls');
  }

  ngOnInit() {

    var selectedTags = (this.selectedVideo && this.selectedVideo.snippet && this.selectedVideo.snippet.tags) ? this.selectedVideo.snippet.tags.map(x => x) : [{}];
    var allTags = this.videoList.map(function(obj: any) { return obj.snippet.tags; });
    console.log(`selectedTags= ${selectedTags}`);
    console.log(selectedTags);
    
    var dictionary = {};
    allTags = allTags ? allTags : ["WTF", "NO", "TAGS"];
    for ( let i in allTags ) {
      for (var k in allTags[i]) {
        if( typeof( dictionary[allTags[i][k]]) == "undefined") {
          dictionary[allTags[i][k]] = 1; //uniques[i][k]);
        }
        else {
          dictionary[allTags[i][k]] =  dictionary[allTags[i][k]] + 1;
        }
      }
     }

    //console.log(dictionary);
    var list = Object.keys(dictionary).map(function(key) { return {name: key, id: dictionary[key]}; });
    console.log(list);
    var list22 = list.sort(this.compare);
    //console.log(`list22= ${list22}`);

    
    const maxTags  = 112;
    this.tags = list22.slice(0, maxTags);
    //this.attributeCheck();
    console.log(this.tags);

    const controls = this.tags.map(c => new FormControl(false));
    // controls[0].setValue(true);
    // set tags they have been selected for this video.
    let i = controls.length;
    while (i--) {
      if (selectedTags.includes(this.tags[i].name)) {
        controls[i].setValue(true);
      }
    }

    //console.log("controls= ", controls);

    this.form = this.formBuilder.group({
      tags: new FormArray(controls, minSelectedCheckboxes(1)),
      additionalTags: new FormGroup({
        //street: new FormControl(''),
        //city: new FormControl(''),
        //state: new FormControl(''),
        newtags: new FormControl('')
      })
      
    });
  }

  submit() {
    const selectedOrderIds = this.form.value.tags
      .map((v, i) => v ? this.tags[i].name : null)
      .filter(v => v !== null);
    
    console.log(" submit() ", selectedOrderIds);
    console.log(this.form.value.additionalTags.newtags);
    //alert('NEWGUY= ' + this.form.value.address.newtags + 'for ' + '\n ' + selectedOrderIds );

    // Sort by tags selected.
    console.log(this.videoList);
    //this.videoList = this.videoList.sort(dynamicSort(selectedOrderIds[0]));
    //this.videoList.sort(dynamicSort22(selectedOrderIds, 'desc'));

    //var ans = filterItems22(this.videoList, selectedOrderIds);
    var ans = dynamicSortFI22(this.videoList, selectedOrderIds, 'asc');

    // this.videoList =  
    //filterItems(this.videoList, selectedOrderIds[0]);
    console.log(`ans= ${ans}`);

    const newlist = this.videoList;
    //this.data.changeMessage(ans); //newlist);
    this.valueChange.emit({});
  }

  cancel() {
    //alert('cancel');
    this.valueChange.emit({});
  }
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

function dynamicSortFI22(arr, query, direction) {
  arr.sort(function (a, b) {
    let achk = [];
    let bchk = [];

    if (a.snippet.tags) {
      achk = a.snippet.tags.filter(ee => {
        return query.indexOf(ee) > -1;
      });
    }

    if (b.snippet.tags) {
      bchk = b.snippet.tags.filter(ee => {
        return query.indexOf(ee) > -1;
      });
    }

    let bbb = 0;
    if (direction === 'asc') {
      bbb = bchk.length - achk.length;
    } else {
      bbb = achk.length - bchk.length
    }

    return bbb;
  });
}

function filterItems22(arr, query) {
  return arr.filter(elem => {
    var chk = 0;
    if (elem.snippet.tags) {
      console.log(elem.snippet.tags);
      chk = elem.snippet.tags.filter(ee => {
        console.log(`ee = ${ee}`);
        console.log(`query = ${query}`);
        return query.indexOf(ee) > -1;
      }).length;
      //console.log(`chk = ${chk}`);
    }
    console.log(`chk = ${chk}`);
    return chk;

  }); //.length;
}

function filterItems(arr, query) {
  return arr.filter((el) => {
    return el.snippet.tags ? el.snippet.tags.includes(query) : false;
  });
}

function dynamicSort22(tags, order = 'asc') {
  return function(a, b) {
    const ba = a.snippet.tags ? tags.filter(element => a.snippet.tags.includes(element)) : false;
    return  ba;
  }
}

function dynamicSort(property) {
  return function (a, b) {
    //const ba = a.snippet.tags ? propertys.filter(element => a.snippet.tags.includes(element)) : false;
    const ba = a.snippet.tags ? a.snippet.tags.includes(property) : false;
    const bb = b.snippet.tags ? b.snippet.tags.includes(property) : false;
    console.log(`ba= ${ba}`);
    console.log(`(ba && bb)= ${(ba && bb)}`);
    return (ba);  
    //return (ba ? ba.length : false);      
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
