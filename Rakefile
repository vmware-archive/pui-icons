desc "Build the website from source"

task :build do
 puts "## Building website"
 status = system("middleman build")
 puts status ? "OK" : "FAILED"
end

desc "Deploy site to PWS"
task :pws_deploy => :build do
 system("git push")
 system("npm run build")
 system("touch build/Staticfile")
 system("cf target -o rothenberg -s development")
 system("cf push pivotalicons -f manifest.yml -p ./build")
end