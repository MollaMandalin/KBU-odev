/******************************************************************************

Welcome to GDB Online.
GDB online is an online compiler and debugger tool for C, C++, Python, Java, PHP, Ruby, Perl,
C#, OCaml, VB, Swift, Pascal, Fortran, Haskell, Objective-C, Assembly, HTML, CSS, JS, SQLite, Prolog.
Code, Compile, Run and Debug online from anywhere in world.

*******************************************************************************/

import java.util.Scanner; 

public class Main
{
	public static void main(String[] args) {
	    
	    Worker personel1 = new Worker();
	    
	    personel1.name = "Yusuf";
	    
	    
	    personel1.socialSecurityNumber = 31313;
     
        personel1.wage = 50;
    
        personel1.workingHours = 15;
        
        personel1.displayInfo();
        personel1.displaySalary();
       
        Scanner klavye = new Scanner(System.in);
        
        Worker personel2 = new Worker();
        
        
        personel2.name = klavye.nextLine();
	    
	    
	    personel2.socialSecurityNumber = klavye.nextInt();
     
        personel2.wage = klavye.nextFloat();
    
        personel2.workingHours = klavye.nextInt();
        
        personel2.displayInfo();
        personel2.displaySalary();
        
	}
}

